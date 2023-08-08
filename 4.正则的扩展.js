//  1. RegExp构造函数
// 情况1：参数是字符串，这时第二个参数表示正则表达式的修饰符(flag)
var regex = new RegExp('xyz', 'i');
/* 等价于 */  var regex = /xyz/i;
// 情况2：参数是一个正则表达式，这时会返回一个原有正则表达式的拷贝
var regex = new RegExp(/xyz/i);
/* 等价于 */  var regex = /xyz/i;
// 情况3：如果 RegExp 构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符
console.log(new RegExp(/abc/ig, 'i').flags);  //  i

// 2. String.prototype.matchAll()
// 如果一个正则表达式在字符串里面有多个匹配，现在一般使用 g 修饰符或 y 修饰符 在循环里取出
// String.prototype.matchAll()方法可以一次性取出所有匹配，并返回一个遍历器(lterator)而不是数组，
// 这意味着可以用 for...of 循环取出 (相对于返回数组，返回遍历器的熬出在于：如果匹配结果是一个很大的数组，那么遍历器比较节省资源)
var regex = /t(e)(st(\d?))/g;  // g修饰符加不加都可以
const string = 'test1test2test3';
for (const match of string.matchAll(regex)) {
    console.log(match);
}
// 遍历器转为数组非常简单，使用 ... 运算符或 Array.from() 方法就可以
Array.from(string.matchAll(regex));
/* 或 */ [...string.matchAll(regex)];

//  3. RegExp.prototype.flags属性
//  es6为正则表达式新增了flags属性，【返回正则表达式的修饰符】


