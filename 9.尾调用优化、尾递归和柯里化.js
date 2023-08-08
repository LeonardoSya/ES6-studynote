//  尾调用(Tail Call)是函数式编程的一个重要概念, 指的是某个函数的最后一步调用另一个函数
function f(x) {
    return g(x);
}
/* 
    es6新增了一项内存管理优化机制，让js引擎再满足条件时可以重用栈帧，这项优化非常适合尾调用

    尾调用之所以与其他调用不同，在于它的特殊的调用位置
    函数调用会在内存形成调用帧(call frame)，所有的调用帧形成一个调用栈(call stack)
    尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧(因为调用位置、内部变量等信息都不会再用到了),只要直接用内层函数的调用帧取代外层函数的调用帧就可以了

    注意：只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则无法进行尾调用优化
*/
function addOne(a) {
    var one = 1;
    function inner(b) {
        return b + one;
    }
    return inner(a);
}
// 这个函数就不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one


// 尾递归：函数尾调用自身
// 递归非常耗费内存，因为需要同时保存大量调用帧，易发生栈溢出。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生栈溢出错误
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}
// 这个阶乘函数最多需要保存n个调用记录，复杂度O(n)

// 如果改写成尾递归，只保留一个调用记录，复杂度O(1)
function factorial(n, total) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
}

// 计算fib  非尾递归的fib
function fib(n) {
    if (n <= 1) return 1;
    return fib(n - 1) + fib(n - 2);
}
// 尾递归优化过的fib
function fib(n, ac1 = 1, ac2 = 1) {  // 把所欲用到的内部变量改写成函数参数
    if (n <= 1) return ac2;
    return fib(n - 1, ac2, ac1 + ac2);
}

// 递归函数的改写
//    尾递归的实现通常需要改写递归函数(确保最后一步只调用自身)，因此要把【所有用到的内部变量改写成函数的参数】
//  但是这样做的缺点是不够直观，可读性不强。两个方法来解决这个问题：

//  1. 函数式编程有一个概念叫 柯里化(currying) 是指【将多参数的函数转换成单参数的形式】
function currying(fn, n) {
    return function (m) {
        return fn.call(this, m, n);
    };
}
function tailFactorial(n, total) {
    if (n === 1) return total;
    return (n - 1, n * total);
}
const factorial = currying(tailFactorial, 1);
factorial(5);   //  120
//  上面代码通过柯里化，将尾递归函数tailFactorial变为只接受一个参数的factorial

//  2. 采用es6函数默认值
function factorial(n, total = 1) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
}
factorial(5); // 120
// 采用函数默认值的方法比柯里化简单很多

//  总结，递归本质上是一种循环操作，存粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现。这也就是尾递归很重要的原因
//  一旦使用递归，就最好使用尾递归 


// 尾调用优化只在严格模式下开启，正常模式是无效的。
// 因为正常模式下函数内部，函数内部有两个变量可以跟踪函数的调用栈:func.arguments返回调用时函数的参数  func.caller返回调用当前函数的那个函数
// 尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以【尾调用模式仅在严格模式下生效】
function restricted() {
    'use strict';
    restricted.caller;             // 报错
    restricted.caller.arguments;   // 报错
}


//  正常模式下，可以采用循环换掉递归，实现减少调用栈的目的
function sum(x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1);
    } else {
        return x;
    }
}
sum(1, 100000)   //  Maximum call stack size exceeded  超出调用栈最大次数
// 蹦床函数可以将递归执行转为循环执行
function trampoline(f) {
    while (f && f instanceof Function) {  //  只要f执行后返回一个函数就继续执行
        f = f();
    }
    return f;
}

//  另外，es6中允许函数参数尾逗号(最后一个参数后面出现逗号)
function test(a, b,) {
    // ...
}
// 这样的规定使得函数参数与数组和对象的尾逗号规则保持一致了