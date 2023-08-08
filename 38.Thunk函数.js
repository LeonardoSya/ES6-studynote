// // Thunk函数是自动执行Generator函数的一种方法
// // 编译器的“传名调用”的实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体，这个临时函数就叫做Thunk函数
// // 也就是说，Thunk函数是传名调用的一种实现策略，用来【替换某个表达式】

// // 但是js语言是传值调用的，它的Thunk函数含义有所不同，在js中，Thunk函数替换的不是表达式而是多参数函数，将其替换成一个只接收回调函数作为参数的单参数函数
// // 一般的readFile(多参数版本)
// fs.readFile(fileName, callback)
// // Thunk版本的readFile(单参数版本)
// var Thunk = function (fileName) {
//     return function (callback) {
//         return fs.readFile(fileName, callback);
//     };
// };
// var readFileThunk = Thunk(fileName);
// readFileThunk(callback);

// // 任何函数，只要参数有回调函数，就能写成Thunk函数的形式，下面是一个简单的Thunk函数转换器
// const Thunk = function (fn) {            // Thunk函数转换器
//     return function (...args) {
//         return function (callback) {
//             return fn.call(this, ...args, callback);
//         }
//     };
// };
// // 使用这个转换器，生成fs.readFile的Thunk函数
// const fs = require('fs');
// function callback() {
//     console.log('OK');
// }
// var readFileThunk = Thunk(fs.readFile);
// readFileThunk('./1.变量的解构赋值.js')(callback);
// // 下面是另一个完整的例子
// function f(a, cb) {
//     cb(a);
// }
// const ft = Thunk(f);
// ft(1)(console.log())


// //  Generator函数的流程管理
// // 自从有了 Generator 函数，Thunk函数现在可以用于Generator函数的自动流程管理
// // Generator函数可以自动执行：
// function* gen() {
//     // ...
// }
// var g = gen();   // 获取遍历器对象
// var res = g.next();   // 执行异步任务第一阶段
// while (!res.done) {    // 只要返回Iterator对象的done值不为true(遍历还未结束)
//     console.log(res.value);
//     res = g.next();
// }
// 上面代码中，Generator函数gen会自动执行完所有步骤，但是这不适合异步操作，如果必须保证前一步执行完才能执行后一步，上面的自动执行就不可行。这时Thunk函数就能派上用处
// 以读取文件为例，下面的Generator函数封装了两个异步操作
var fs = require('fs');
var thunkify = require('thunkify');   // Thunkify模块是生产环境中的转换器
var readFileThunk = thunkify(fs.readFile);

var gen = function* () {
    var r1 = yield readFileThunk('./1.变量的解构赋值.js');
    console.log(r1.toString());
    var r2 = yield readFileThunk('./2.字符串的扩展及模板字符串.js');
    console.log(r2.toString());
};
// 上面代码中，yield命令用于将程序的执行权移出Generator函数，那么就需要一种方法【将执行权再交还给Generator函数】，这种方法就是Thunk函数，因为它可以在回调函数里将执行权交还给Generator函数
// 手动执行这个Generator函数
var g = gen();      // Generator内部指针 g 表示目前执行到哪一步
var r1 = g.next();       // next负责移动指针并返回该步信息(value,done)
r1.value(function (err, data) {       // 可以发现Generator函数的执行过程，其实是将同一个回调函数反复传入next方法的value属性。因此可以递归完成这个过程
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function (err, data) {
        if (err) throw err;
        g.next(data);
    });
});

// !! Thunk函数的自动流程管理
// Thunk函数真正的重点在于可以自动执行Generator函数，下面是一个基于Thunk函数的Genrator执行器
function run(fn) {     // run函数就是一个Generator函数的自动执行器
    var gen = fn();
    function next(err, data) {      // run函数内部的next函数就是Thunk的回调函数
        var res = gen.next(data);
        if (res.done) return;
        res.value(next);  // 如果遍历没结束，就将next函数再传入Thunk函数(res.value属性)
    }
    next();
}
// 这样不管内部有多少个异步操作，直接把Generator函数传入run函数即可，前提是每隔异步操作都是Thunk函数。也就是说，跟在yield命令后面的必须是Thunk函数
var g = function* () {    // 函数g封装了若干异步操作，只要run()，这些操作会自动完成。这样一来，异步操作不仅可以写得像同步操作，而且一行代码就可以执行
    var f1 = yield readFileThunk('./1.变量的解构赋值.js');
    var f2 = yield readFileThunk('./2.字符串的扩展及模板字符串.js');
    // ...
};
run(g);  // run()就能执行g中所有异步操作

// 另外，Thunk函数并不是Generator函数自动执行的唯一方案，因为自动执行的关键是必须有一种机制自动控制Generator函数的流程，接收和交还程序的执行权。回调函数和Promise对象都能做到这一点


