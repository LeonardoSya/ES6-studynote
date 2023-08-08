//  Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大
//  所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
//  从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
/*
    Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

注意，为了行文方便，本章后面的resolved统一只指fulfilled状态，不包含rejected状态。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署Promise更好的选择。
*/


//  基本用法：
// Promise对象是一个构造函数，用来生成Promise实例，下面代码创造了一个Promise实例
const promise = new Promise(function (resolve, reject) {
    // ... some code
    if (/**异步操作成功 */ true) {
        resolve(value);
    } else {
        reject(error);
    }
});
// Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由js引擎提供，不用自己部署
// resolve函数的作用是将promise对象的状态从pending变为resolved，在异步操作成功时调用，并将异步操作的结果作为参数传递出去
// reject函数的作用是将promise对象的状态从pending变为rejected，在异步操作失败时调用，并将异步操作报出的错误作为参数传递出去

// Promise实例生成后，可以用then方法分别指定resolved状态和rejected状态的回调函数
promise.then(function (value) {
    // success
}, function (error) {
    // failure
});   // then方法接受两个回调函数作为参数，第二个函数是可选的

// Promise对象的简单例子
function timeout(ms) {        //  timeout方法返回一个promise实例，表示过一段时间后才会发生的结果。过了指定的时间(ms参数)后，promise实例的状态变为resolved，就会触发then方法绑定的回调函数
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}
timeout(100).then((value) => {
    console.log(value);
})



//  1. Promise.resolve()  将现有对象转为Promise对象

// (1) 当参数是一个thenable对象   thenable对象指的是具有 then 方法的对象
let thenable = {
    then: function (resolve, reject) {
        resolve(42);
    }
};
// Promise.resolve方法会将这个对象转为Promise对象，然后立即执行thenable对象的then方法
let p1 = Promise.resolve(thenable);   // thenable对象的then方法执行后，对象p1的状态就变成了resolved，从而立即执行最后那个then方法指定的回调函数，输出42
p1.then(function (value) {
    console.log(value);
});

// (2)参数不是具有then方法的对象，或根本不是对象
const p = Promise.resolve('hello');  // 字符串helo不属于异步操作(判断方法是字符串对象不具有then方法)，返回Promise实例的状态从一生成就是resolved，所以回调函数会立即执行
p.then(function (s) {
    console.log(s)
})


// 2.  Promise.reject(reason) 方法 也会返回一个新的Promise实例，该实例的状态为rejected


// 应用：将图片的加载写成一个promise，一旦加载完成，promise的状态就发生变化
const preloadImage = function (path) {
    return new Promise(function (resolve, reject) {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
    })
}


// 异步加载图片的例子：
function loadImageAsync(url) {
    return new Promise(function (resolve, reject) {
        const image = new Image();
        image.onload = function () {
            resolve(image);
        };
        image.onerror = function () {
            reject(new Error('Could not load imaage at' + url));
        };
        image.src = url;
    });
}
// 使用promise包装了一个图片加载的异步操作，如果加载成功，就调用resolve方法，否则调用reject方法


