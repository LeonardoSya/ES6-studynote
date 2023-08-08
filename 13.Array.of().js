// Array.of方法用于将一组值转换为数组
Array.of(3, 11, 8)  //  [3,11,8]
// 这个方法的主要目的是弥补数组构造函数Array()的不足，因为参数个数的不同会导致Array()的行为有差异
Array(3)  //  [,,,]
Array(3, 2, 1)  // [3,2,1]
// 这说明只有当参数个数不少于两个时,Array()才会返回由参数组成的新数组。当参数个数为1时，实际上是指定数组的长度

// 【Array.of方法基本上可以替代Array()或new Array()】，Array.of()不存在由于参数不同而导致的重载，它的行为非常统一
// Array.of总是返回参数值组成的数组，如果没有参数就返回一个空数组
// Array.of方法可以用下面的代码模拟实现:
function Arrayof() {
    return [].slice.call(arguments);
}
