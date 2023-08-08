// 传统的编程语言早有异步编程的解决方案(多任务的解决方案)，其中一种叫做协程coroutine，是多个线程互相协作，完成异步任务
/**
协程运行流程：
    1. 协程A开始执行
    2. 协程A执行到一半，进入暂停，执行权转移到协程B
    3. (一段时间后)协程B交还执行权
    4. 协程A恢复执行
协程A，就是异步任务，因为它分成多段执行
*/
// 例：读取文件的协程写法：
function *asyncJob() {
    // ...
    var f = yield readFile(fileA);
    // ... 
}
// asyncJob就是一个协程，它的奥妙在于其中的yield命令，它表示执行到此处，执行权将交给其他协程，也就是说，【yield命令是异步两个阶段的分界线】
// 协程遇到yield就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点是可读性，代码的写法非常像同步操作，去除yield命令，简直一模一样

// 整个Generator函数就是一个封装的异步任务，或者说是异步任务的容器，异步操作需要暂停的地方(yield)
function* gen(x) {
    var y = yield x + 2;
    return y;
}
var g = gen(1);  // 调用Generator函数会返回一个内部指针(遍历器)g, 因为Generator函数不会返回结果，而是返回指针对象。调用指针g的next方法会移动内部指针(即执行异步任务的第一段)，指向第一个遇到的yield语句
console.log(g.next());   //  { value: 3, done: false }

// 暂停和恢复执行是Generator函数能封装异步任务的根本原因。除此之外，【函数体内外的数据交换】和【错误处理机制】使它可以作为异步编程的完整解决方案
// next返回值的value属性是Generator函数向外输出数据；next方法接受参数是向Generator函数体内输入数据
console.log(g.next(2));   //  { value: 2, done: true }  // next的参数2作为上个阶段异步任务的返回结果，被y接收，因此这一步的value属性返回y的值2
// Generator函数内部可以部署错误处理代码，捕获函数体外抛出的错误
function* genn(x) {
    try {
        var y = yield x + 2;
    } catch (e) {
        console.log(e);
    }
    return y;
}
var g1 = genn(1);
console.log(g1.next());   //  { value: 3, done: false }
g1.throw('Error')   //  Error   Generator函数体外，使用指针对象的throw方法抛出的错误，可以被函数体内的try...catch代码块捕获并执行(打印)。这意味着出错的代码与处理错误的代码实现了时间和空间的分离，这对于异步编程无疑是很重要的


// 异步任务的封装 (如何使用Generator函数)
var fetch = require('node-fetch');
function* gen() {
    var url = 'https://api.github.com';  // 读取一个远程接口
    var result = yield fetch(url);
    console.log(result.bio);
}
// 执行这个异步任务
var g = gen();   // 首先执行Generator函数获取遍历器对象
var result = g.next();   // next执行异步任务第一阶段
result.value.then(function (data) {   // 由于fetch模块返回的是一个promise对象，因此要用then方法调用下一个next方法
    return data.json();
}).then(function (data) {
    g.next(data);
})
// 但是这样写流程管理却不太方便(即何时执行第一阶段、何时执行第二阶段) 因此要引入【自动执行Generator函数的一种方法：Thunk函数】







