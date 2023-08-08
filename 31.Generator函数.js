/**
    Generator函数 一个状态机 / 遍历器对象生成函数
 */

// Generator(生成器)函数是es6提供的一种异步编程解决方案，语法与传统函数完全不同
// 执行Generator函数会返回一个遍历器对象，可以依次遍历Generator函数内部的每一个状态(Generator函数像是一个状态机，封装了多个内部状态)
function* helloWorldGenerator() {
    yield 'hello';   // yield(产出)
    yield 'world';
    return ' ending';
}
var hw = helloWorldGenerator();
// 定义了一个Generator函数，它内部有两个yield表达式，即函数有三个状态:hello,world和return 
// 调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象(Iterator对象)
// 下一步，必须调用遍历器对象的next()方法，使得指针移向下一个状态。也就是说每次调用next()内部指针就从函数头部或上次停下来的地方开始执行，直到遇到下一个yield/return
// 换而言之，Generator函数是分段执行的,yield暂停执行，next恢复执行
hw.next()    //  { value: 'hello', done: false }
hw.next()    //  { value: 'world', done: false }
hw.next()    //  { value: 'ending', done: true }
hw.next()    //  { value: undefined, done: true }
// next方法返回的对象的value属性就是当前yield表达式的值  done属性的布尔值表示遍历是否结束  Generator函数运行完毕后(return)，next返回对象的value属性为undefined
// 需要注意的是，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行。因此等于为js提供了手动的惰性求值(Lazy Evalution)的语法功能
function* gen() {
    yield 123 + 456;  // 该表达式不会立即求值，只会在next方法将指针移到这一句时，才会求值
}


// 由于Generator函数就是遍历器生成函数，因此可以把Generator赋值给对象的Symbol.iterator属性，从而使该对象具有iterator接口
var myIterable = {};
myIterable[Symbol.iterator] = function* () {   // Generator函数赋值给任意对象的Symbol.iterator属性，从而使myIterator对象具有了iterator接口，可以被...遍历了
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable]  // [1,2,3]

// iterator为不同数据结构提供统一的访问机制，任何数据结构具有iterator接口都可遍历，
// 因为Iterator接口有内置的遍历机制(iterator指针,next,hasnext),这也就意味着在任何对象的[Symbol.iterator]中添加Generator函数都能实现对象的可遍历

// Generator函数执行后，返回一个遍历器对象，该对象本身也具有Symbol.iterator属性，执行后返回自身


// Generator函数总是返回一个遍历器，是因为这个遍历器是Generator函数的实例，也继承了Generator函数的prototype对象上的方法
function *g() { }
g.prototype.hello = function () {
    return 'hello!;'
};
let obj = g();  // 如果上面 *g 写的是普通函数 g，并不会生效，因为g返回的是遍历器对象，而不是this对象
console.log(obj instanceof g)    // true  说明Generator函数 g ,是g的实例，而且继承了g.prototype
console.log(obj.hello())     // hello!
// *g 不是构造函数，所以不能new