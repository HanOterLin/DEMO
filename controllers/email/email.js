var express = require('express');
var router = express.Router();
var config = require('config');
var uuid = require('uuid');
var nodemailer = require('nodemailer');

var pgp = require("pg-promise")(/*options*/);
require('dotenv').config();
var db = pgp(process.env.POSTGRE_CONNECTION);


router.post('/dbtest', function (req, res) {
    db.func("oter.get_user_by_id", ['3'])
        .then(function (data) {
            res.end(JSON.stringify(data));
        }).catch(function (error) {
        res.end(error);
    })
});

router.post('/registration', function (req, res) {
    try {
        var data = req.body;

        var email = config.get('Email.regTemplate');
        email.mailOptions.to = data.regEmail;
        var contentHTML = '<h1>Verification:</h1><a href="http://localhost:8888/code-verification/' + uuid.v1() + '">点击验证</a>';
        email.mailOptions.html = contentHTML;

        var transporter = nodemailer.createTransport(email.config);
        transporter.sendMail(email.mailOptions, function (error, info) {
            if (error) {
                res.end(error.message);
            } else {
                res.end(info.response);
            }
        });
    } catch (e) {
        console.error(e);
    }
});

router.post('/test', function (req, res) {

    var async = require('async');

    var objs = [{name: 'A'}, {name: 'B'}, {name: 'C'}];

    function doSomething(obj, cb) {
        console.log("我在做" + obj.name + "这件事!");
        cb(null, obj);
    }

    async.eachSeries(objs, function (obj, callback) {
        doSomething(obj, function (error, result) {
            callback();
        });
    }, function (err) {
        console.log("err is:" + err);
    });


//和each是有明显区别的，如果没有异步调用，和each无差别，如果有异步调用，则区别十分大
    async.eachSeries(objs, function (obj, callback) {
        doSomething(obj, function (error, result) {
            callback("It's a err.");
        });
    }, function (err) {
        console.log("err is:" + err);
    });


    var i = 0;
    async.whilst(
        //条件
        function () {
            return i < 3;   //true，则第二个函数会继续执行，否则，调出循环
        },
        function (whileCb) { //循环的主体
            console.log(i);
            i++;
            whileCb();
        },
        function (err) {         //here 如果条件不满足，或者发生异常
            console.log("err is:" + err);
            console.log("end,the i is:" + i);
        }
    );


    i = 0;
    async.whilst(
        function () {
            return i < 3;   //true，则第二个函数会继续执行，否则，调出循环
        },
        function (whileCb) { //循环的主体
            console.log(i);
            i++;
            if (i == 2) {
                whileCb("It's time to break.");
            }
            else {
                whileCb();
            }
        },
        function (err) {         //here 如果条件不满足，或者发生异常
            console.log("err is:" + err);
            console.log("end,the i is:" + i);
        }
    );


    async.waterfall([
        //A这件事
        function (cb) {
            doSomething(objs[0], function (err, dataA) {
                console.log(dataA);
                cb(err, dataA);     //如果发生err， 则瀑布就完了，后续流程都不会执行，B和C都不会执行
            });
        },
        //B这件事，dataA就是上一步cb(err, dataA)中传进来的dataA
        function (dataA, cb) {
            doSomething(objs[1], function (err, dataB) {
                console.log(dataB);
                cb('haha', dataA, dataB);  //如果发生err， 则瀑布就完了，后续流程都不会执行，C不会执行
            });
        },
        //C这件事
        function (dataA, dataB, cb) {
            doSomething(objs[2], function (err, dataC) {
                console.log(dataC);
                cb(err, dataA, dataB, dataC);
            });
        }
    ], function (err, dataA, dataB, dataC) {    //瀑布的每一布，只要cb(err, data)的err发生，就会到这
        if (err) {
            console.log('处理错误!');
        }
        else {
            console.log('处理成功！');
            console.log(dataA);
            console.log(dataB);
            console.log(dataC);
        }
    });

});

module.exports = router;