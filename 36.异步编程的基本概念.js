// 异步编程对js太重要，js语言的执行环境是单线程的，如果没有异步编程，根本没法用，非卡死不可
// es6之前，异步编程主要有这些方法：回调函数、事件监听、发布/订阅、Promise对象

// 1. 概念
// (1) 异步
// 连续的执行叫同步，由于是连续执行，不能插入其他任务。 异步：一个任务不是连续完成的。比如说，有一个任务是读取文件进行处理，任务的第一段是向操作系统发出请求要求读取文件，然后程序执行其他任务，等到操作系统返回文件再接着执行任务的第二段(处理文件)。这种不连续的执行，就叫做异步
// (2) 回调函数 实现异步   
fs.readFile('xxx', 'utf-8', function (err, data) {  // 回调函数中是任务的第二段 这意味着操作系统返回'xxx'文件后，才会执行回调函数
    if (err) throw err;
    console.log(data);
});
// 有趣的问题: 为什么Node规定回调函数的第一个参数必须是错误对象err？原因是执行分成两段：第一段执行完之后，任务所在的上下文环境就已经结束了，在这以后抛出的错误，原来的上下文环境已经无法捕捉，只能当作参数传入第二段
// 回调函数本身并没问题，它的问题出现在多个回调函数嵌套，多个异步操作形成了【强耦合】，只要有一个操作需要修改，它的上层和下层回调函数可能都要修改，这种情况被称为"回调函数地狱"(callback hell)
// (3) Promise 实现异步
// Promise对象就是为了解决 callback hell 的问题出现的，【它不是新语法而是新写法】，允许将回调函数的嵌套改成链式调用，采用Promise连续读取多个文件写法：
var readFile = require('fs-readfile-promise');  // 该模块的作用是返回一个Promise版本的readFile函数。Promise提供then方法加载回调函数、catch方法捕捉执行过程中抛出的错误
readFile(fileA)
    .then(function (data) {
        console.log(data.toString());
    })
    .then(function () {
        return readFile(fileB);
    })
    .then(function (data) {
        console.log(data.toString());
    })
    .catch(function (err) {
        console.log(err);
    })
// 可以看到，Promise的写法只是回调函数的改进，使用then后，异步任务的两段执行看得更清楚了，除此之外无新意
// Promise最大的问题是代码冗余，原来的任务被Promise包装了一下，就是一堆then。语义化降低
