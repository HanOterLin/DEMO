let promise = new Promise(function (resolve, reject) {
    // resolve('1');
});
console.log('before');
promise.then(
    (res) => res
).then(
    (res) => res
).then(
    (res) => res
).then(
    (res) => res
).then(
    (res) => res
).then(function(res){
    console.log(res);
}, function (err) {
    console.error(err);
}).then(
    (res) => res
).then(
    (res) => res
).then(
    (res) => res
).then(function(res){
    console.log(res);
}, function (err) {
    console.error(err);
});
console.log('after');
