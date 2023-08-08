/** 1. 属性的简洁表示方法 */
// es6允许在大括号内直接写入变量和函数 作为对象的属性和方法
function f(x, y) {
    return { x: x, y: y };
}
console.log(f(1, 2))  //  Object { x: 1, y: 2 }

const o = {
    method() {        // 等于 method:function(){}
        return 'hello';
    }
};

// 实例
let birth = '2004/06/24';
const Person = {
    name: 'zyyy',
    birth,
    hello() {
        console.log('myName:', this.name);
    }
};
console.log(Person)

function getPoint() {
    const x = 1;
    const y = 10;
    return { x, y };
}
getPoint();  //  {x:1,y:10}


/** 2. 属性的可枚举性 */
// 对象的每一个属性都有一个描述对象，用来控制该属性的行为  Object.getOwnPropertyDescriptor 方法可以获取该属性的描述对象
let obj = { foo: 123 };
Object.getOwnPropertyDescrip(obj, 'foo');
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,  // 可枚举性
//    configurable: true
//  }
// 描述对象的enumerable属性称为‘可枚举性’，如果该属性为false，就表示有些操作会忽略当前属性
// 可枚举(enumerable)这个概念最初的目的，就是让某些属性可以规避掉for...in操作，不然所有内部属性和方法都会被遍历到
// 比如对象原型的toString方法、数组的length属性，就通过可枚举性避免被for...in遍历到
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable;   // false
Object.getOwnPropertyDescriptor([], 'length').enumerable;   // false

/** 属性的遍历 */
/**
 * 1. for...in  循环遍历对象自身和继承的可枚举属性(不含Symbol)
 * 2. Object.keys(obj)  返回一个数组，包括对象自身(不含继承的)所有可枚举属性(不含Symbol)的键名
 * 3. Object.getOwnPropertyNames(obj)  返回一个数组，包含对象自身的所有属性(不含Symbol属性，但是包括不可枚举属性)的键名
 */


//**   3. 对象的扩展运算符 */
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x, y, z)   //   1 2 { a: 3, b: 4 }
// 解构赋值必须是最后一个参数，否则会报错。并且解构赋值的拷贝是浅拷贝，如果一个键的值是复合类型的值(数组、对象、函数)，那么解构赋值拷贝的是这个值的引用，而不是这个值的副本

