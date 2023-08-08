/**  1. 扩展运算符 */
// 扩展运算符(...)类似rest参数的逆运算，将一个数组转为用逗号分隔的参数序列
console.log(...[1, 2, 3]);   // 1 2 3
[...document.querySelectorAll('div')]   //  [<div>, <div>, <div>]
// 该运算符主要用于函数调用
function push(array, ...items) {
    array.push(...items);
}
function add(x, y) {
    return x + y;
}
const numbers = [4, 2];
add(...numbers);  //  6
//  上面代码中，函数调用使用了扩展运算符，该运算符将一个数组变为参数序列
// 扩展运算符与正常的函数参数结合使用，非常灵活
function f(a, b, c, d, e) { }
const args = [0, 1];
f(1, ...args, 2, ...[3]);  // 注意：只有函数调用的时候，扩展运算符才可以放在圆括号中

//  由于扩展运算符可以展开数组，所以不再需要apply方法将数组转为函数参数了
Math.max.apply(null, [1,2,3]);  // es5写法
Math.max(...[1,2,3]);  // es6写法  == Math.max(1,2,3)
var arr1 = [1,2,3];
var arr2 = [4,5,6];
Array.prototype.push.apply(arr1, arr2);  //  es5写法
arr1.push(...arr2);   //  es6写法  将arr2追加到arr1尾部

// 扩展运算符的运用：
// （1）复制数组   数组是复合数据类型，直接复制的话只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组
const a1 = [1,2];
const a2 = a1;
a2[0]=2;
a1;  // [2, 2]   这说明a2并不是a1的克隆，而是指向同一份数据的另一个指针，修改a2会直接导致a1的变化

const b1 = [1,2];
const b2 = [...a1];   //  扩展运算符用简洁的写法实现了数组的克隆

// (2)合并数组
a1.concat(b1,b2);  // es5
[...a1,...b1,...b2];  // es6的合并数组
// 不过这两种方法都是浅拷贝 新数组的成员都是对原数组成员的引用。如果修改了引用指向的值，会同步反映到新数组
 
// (3)字符串  扩展字符串可以将字符串转为真正的数组
[...'hello']  // ["h", "e", "l", "l", "o"]

