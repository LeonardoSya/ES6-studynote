//  1. String.fromCodePoint()  识别字符
String.fromCodePoint(0x20BD5);  // 𠯕
String.fromCodePoint(0x78, 0x1f680, 0x79);  //  x🚀y  如果该方法有多个参数，则它们会被合并成一个字符串返回
// 注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上

//  2. String.raw()
//  该方法返回一个斜杠都被转义(即斜杠前面再加一个斜杠)的字符串，往往用于模板字符串的处理方法
String.raw`Hi\n${2 + 3}!`  //  Hi\n5!
//  String.raw()方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。

//  3. includes() startsWith() endsWith()
//  传统上js只有 indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中，es6提供了三种新方法
let s = 'hello world!';
s.startsWith('hello')  // true
s.endsWith('!')  // true
s.includes('o')  // true
// 这三个方法都支持第二个参数，表示开始检索的位置.endsWith()的行为与其他两个方法不同，它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束
s.includes('hello', 6)  // false

//  4. repeat() 
//  该方法返回一个新字符串，表示将原字符串【重复n次】
'x'.repeat(3)   //  'xxx'  // 参数如果是负数或Infinity 会报错

//  5. padStart() 头部补全, padEnd() 尾部补全
'x'.padStart(5, 'abc')   //  abcax
// 第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串.若省略第二个参数则默认使用空格补全长度
'x'.padEnd(10)   //  'x   
// padStart()最常见的用途是为数值补全指定位数
'123'.padStart(10, '0')   //  0000000123
// 另一个用途是提示字符串格式
'09-12'.padStart(10, 'YYYY-MM-DD')   //  YYYY-09-12

//  6. trimStart() 消除字符串头部的空格, trimEnd() 消除字符串尾部的空格  返回新字符串,不会修改原始字符串
const str = '   abc   ';
str.trim()  //  'abc'
s.trimStart()  // 'abc    '



