/**  1. 函数参数的默认值  */
//  es6之前，不能直接为函数的参数指定默认值，只能采用变通的方法
function log(x, y) {
    y = y || 'world';
    console.log(x, y);
}
log('hello', '');  //  hello world  如果y等于空字符，结果却被改为默认值world
//  上面代码检查函数log的参数y有没有默认值，如果没有，则指定默认值为world。
//  这种写法的缺点在于，如果参数y赋值了但是为false，则该赋值不起作用
//  为了避免这个问题，通常需要先判断y是否被赋值，如果没有，再等于默认值
function log(x, y) {
    if (typeof y === 'undefined') {
        y = 'world';
    }
    console.log(x, y);
}
log('hello', '');  //  hello


//  es6允许为函数的参数设置默认值
function log(x, y = 'world') {
    console.log(x, y);
}
log('hello', '');  //  hello
log('hello');      //  hello world
function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}
const p = new Point();
console.log(p)   //  Point { x: 0, y: 0 }

//  除了简洁，es6的写法还有其他好处：阅读者可以立刻意识到哪些参数是可以省略的，也有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数也不会导致以前的代码无法运行
// 另外，由于参数变量是默认声明的，所以不能用let或const再次声明

// 一个容易忽略的地方：参数默认值不是传值的是，而是每次都重新计算默认值表达式的值，也就是说，【参数默认值是惰性求值的】
let x = 99;
function foo(p = x + 1) {
    console.log(p);
}
foo();  // 100
x = 100;
foo();  // 101  这说明每次调用函数foo时，都会重新计算x+1，而不是默认p等于100

//  参数默认值可以与解构赋值的默认值结合使用
function fo({ x, y = 5 }) {
    console.log(x, y);
}
fo({ x: 1, y: 2 });   //  1 2
fo({ x: 1 });         //  1 5
//  上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值，只有当函数fo的参数是一个对象时，变量x和y才会通过解构赋值生成；如果fo调用时没有提供参数，变量x和y就不会生成并报错，通过提供函数参数默认值，可以避免这种情况
// fo();   //  TypeError: Cannot destructure property 'x' of 'undefined' as it is undefined.

function fooo({ x, y = 5 } = {}) {   //  如果没有提供参数为对象，则函数fooo的参数默认为一个空对象
    console.log(x, y);
}
fooo();   //  undefined 5

function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {  // 双重默认值
    console.log(method);
}
fetch('http://example.com', {});  //  GET
fetch('http://example.com');      //  GET


//  应用：利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误
function throwIfMissing() {
    throw new Error('Missing parameter');
}
function fn(mustBeProvided = throwIfMissing()) {   //如果调用的时候没有参数，就会调用默认值throwIfMissing()函数，从而抛出一个错误
    return mustBeProvided
}
fn()   //  Error: Missing parameter

//  另外，可以将参数默认值设为undefined，表明这个参数是可以省略的
function test(optional = undefined) { }