// yield表达式本身没有返回值，或者说总是返回undefined。
// yield表达式【只能改变返回对象的value属性的值】，当 var res = yield 1 时，res仍是undefined，要想给res赋值，需要【下一个】next()参数
// next方法可以带一个参数，该参数会被当作【上一个】yield表达式的返回值
function* f() {
    for (var i = 0; true; i++) {
        var reset = yield i;  // 如果next方法没有参数，reset的值总是undefined
        if (reset) { i = -1 };
    }
}
var g = f();
console.log(g.next())
console.log(g.next())
console.log(g.next(true))  // 当next参数为true时，变量reset被重置为这个参数(true)，因此i会=-1，下一轮循环从-1开始递增
// 通过next方法的参数，可以在Generator函数运行的不同阶段，从外部向内部注入不同的值，从而调整行为

function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}
var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}   第二次next不带参数，导致初始化z时y的值为2*undefined，返回对象的value属性自然是NaN
a.next() // Object{value:NaN, done:true}
var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }    将上一次yield表达式的值设为12，因此y=24，返回value为8
b.next(13) // { value:42, done:true }
// 注意：由于next方法的参数表示上一个yield表达式的返回值，所以在第一次next时传参是无效的。从语义上讲，【第一个next方法用来启动遍历器对象】。所以不用携带参数

// for...of循环可以自动遍历Generator函数运行时生成的Iterator对象，且此时不用调用next方法   扩展运算符、解构赋值和Array.fron()同理，它们四个都可以将Generator函数返回的Iterator对象作为参数
function* fo() {
    yield 1;
    yield 2;
    return 6;
}
for (let v of fo()) {
    console.log(v);  // 1 2 
}
// fib
function* fib() {
    let [prev, curr] = [0, 1];
    for (; ;) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}
for (let n of fib()) {
    if (n > 1000) break;
    console.log(n);
}


//  next()、throw()、return()这三个方法本质上是同一件事，它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换yield表达式。

// next()是将yield表达式替换成一个值。
// ...
//  上面代码中，第二个next(1)方法就相当于将yield表达式替换成一个值1。如果next方法没有参数，就相当于替换成undefined。

//  throw()是将yield表达式替换成一个throw语句。
gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));

// return()是将yield表达式替换成一个return语句。
gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;

