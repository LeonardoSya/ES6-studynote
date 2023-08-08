//  数组实例的find方法，用于找出第一个符合条件的数组成员。
// 它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找回第一个返回值为true的成员，然后返回该成员，否则返回undefined
[1, 4, -5, -10].find((n) => n < 0);  // -5
// find方法的回调函数可以接受3个参数，依次为当前值、当前位置、原数组
[1, 5, 10, 15].find(function (value, index, arr) {
    console.log(value, index, arr)
})
/**
1 0 [ 1, 5, 10, 15 ]
5 1 [ 1, 5, 10, 15 ]
10 2 [ 1, 5, 10, 15 ]
15 3 [ 1, 5, 10, 15 ]
 */

// findIndex方法的用法与find方法类似，返回第一个符合条件的数组成员位置，否则返回-1
// [1, 5, 10].findIndex((value, index, arr) => value > 9) //  2

// 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象
function f(v) {
    return v > this.age;
}
let person = { name: 'John', age: 20 };
const res = [10, 12, 26, 15].find(f, person);
console.log(res)   //  26
// 上面的代码中，find接受了第二个参数person对象，回调函数中this指向person对象


//  数组实例的fill() 使用给定值填充一个数组
new Array(3).fill(7)  // [7,7,7]  
['a', 'b', 'c'].fill(7) // [7,7,7]     fill用于空数组的初始化非常方便，数组中已有的元素会被全部抹去
// fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置
['a', 'b', 'c'].fill(7, 1, 2)  // 从下标1开始，到下标2之前结束
// 注意，如果填充类型为对象，那么被复制的是同一个内存地址的对象，而不是深拷贝对象



//  数组实例的 entries() keys() values()
// 这三个方法用于遍历数组，它们都返回一个遍历器对象(可以用for...of循环进行遍历)
for (let i of ['a', 'b', 'c'].keys()) {
    console.log(i);  // 0  1
}
