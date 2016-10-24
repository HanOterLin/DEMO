/***
 * main filter and add function here
 */

var jwtFilter = require(__app.__filters.jwtFilter);
var initFilter = require(__app.__filters.initFilter);
var xssFilter = require(__app.__filters.xssFilter);

var self = {
    init: function (options) {

        self.o = options || {};

        self.add(initFilter).add(jwtFilter).add(xssFilter);

        return self.run;
    },
    add: function (fn) {

        self.filterList.push(fn);

        return self;
    },
    runNext: function (o, req, res) {

        self.filterList[self.o.currentFunction](o, req, res);

        self.o.currentFunction++;

        if (self.o.next && self.o.currentFunction < self.filterList.length) {
            self.runNext(self.o, req, res);
        } else {
            self.complete();
        }
    },
    run: function (req, res, next) {

        self.o.req = req, self.o.res = res, self.o.next = next, self.o.doNext = true, self.o.currentFunction = 0;

        if (self.o.next && self.o.currentFunction < self.filterList.length) {
            self.runNext(self.o, req, res);
        }

    },
    complete: function () {
        if (self.o.doNext)
            self.o.next();
    },
    o: {
        req: {},
        res: {},
        next: {},
        doNext: true,
        currentFunction: 0
    },
    filterList: [],
};

module.exports = self.init;
