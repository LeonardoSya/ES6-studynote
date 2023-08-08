//  1.  字符的 Unicode 表示法
//  ES6加强了对 Unicode(国际标准字符集) 的支持，允许采用 \uxxxx 形式表示一个字符，其中 xxxx 表示字符的Unicode码点
console.log(`\u0061`);   //  a
console.log(`\u{41}\u{42}\u{43}`);   //  ABC
'中' === '\u4e2d';  // true

//  2.  字符串的遍历器接口
//  es6为[字符串]添加了[遍历器接口]，使得字符串可以被 for...of 循环遍历
for (let codePoint of 'foo') {
    console.log(codePoint);     //  f o o
}
//  除了遍历字符串，这个遍历器最大的优点是可以识别大于0xFFFF的码点(传统的for循环无法识别这样的码点)
let text = String.fromCodePoint(0x20D27);
for (let i of text) {
    console.log(i);   // 𠴧
}
// 上面代码中，字符串 text 只有一个字符，但是for循环会认为它包含两个字符(都不可打印)，而for...of循环会正确识别出这个字符

//  !!!!   3.模板字符串
// template string 模板字符串 用反引号(`)标识。它可以用来定义多行字符串或再字符串中嵌入变量 若此变量未声明将报错
`In JavaScript this is
not legal.`
let name = 'leo';
`Hello ${name}`;
// 使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中
$('#list').html(`
<ul>
    <li>first</li>    
</ul>`)
// { }内部可以放入任意js表达式，可进行运算、引用对象属性、嵌套等，甚至调用函数
let obj = { x: 1, y: 2 };
`${obj.x + obj.y}`    //  3
function templateString() {
    return 'hello world!';
}
console.log(`foo ${templateString()} bar`);  //  foo hello world! bar
// 如果需要引用模板字符串本身 并在需要时执行，可以写成函数
let func = (name) => `hello ${name}`;  // 模板字符串写成函数返回值，执行这个函数就相当于执行这个模板字符串
console.log(func('leona')); //

//  4. 标签模板 
//  模板字符串还可以【紧跟在一个函数名后面】，【该函数将被调用来处理这个模板字符串】(标签模板 tagged template)
alert`hello`  //  等同于 alert(['hello'])
// 标签模板其实不是模板，而是函数调用的一种特殊形式，“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。但是如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数
let a1 = 5, b1 = 10;
tag`hello ${a1 + b1} world ${a1 * b1}`;
/* 等同于 */  tag(['hello', 'world', ''], 15, 50)   //  tag函数实际上以此形式调用
// 上面代码中，模板字符串前面有一个标识名tag 这是一个函数，整个表达式的返回值就是tag函数处理模板字符串后的返回值
// 函数tag依次会接收到多个参数
function tag(stringArr, value1, value2) { }
/* 等同于 */  function tag(stringArr, ...values) { }
/*
    tag函数的第一个参数是一个【数组】，该数组的成员是模板字符串中那些【没有被变量替换的部分】。也就是说，变量替换只发生再数组的第一个成员和第二个成员之间、第二个成员和第三个成员之间... 以此类推
    tag函数的其他参数，都是模板字符串各个变量被替换后的值。本例中，模板字符串含有两个变量，因此tag会接受到value1和value2两个参数
*/
// 我们可以按需编写tag函数代码，下面是tag函数的一种写法及运行结果
let a = 5, b = 10;
function tag(sum, value1, value2) {
    console.log(sum[0]);
    console.log(sum[1]);
    console.log(sum[2]);
    console.log(value1);
    console.log(value2);
    return 'ok';
}
tag`hello ${a + b} world ${a * b}`;
/*
hello 
 world 

15
50
*/

// 下面是一个更复杂的例子
let total = 30;
let msg = passthru`The total is ${total} (${total * 1.05} with tax)`;
function passthru(literals) {
    let result = '';
    let i = 0;
    while (i < literals.length) {
        result += literals[i++];
        if (i < arguments.length) {
            result += arguments[i];
        }
    }
    return result;
}
console.log(msg);  // "The total is 30 (31.5 with tax)"
// 上面这个例子展示了如何将各个参数按照原来的位置拼合回去

//  标签模板的一个重要应用就是【过滤 HTML 字符串，防止用户输入恶意内容】
let sender = '<script>alert("abc")</script>';  // 恶意代码
let message =
    SaferHTML`<P>${sender} has sent you a message.</P>`;   // 这里sender变量是用户提供的，经过SaferHTML函数处理，里面的特殊字符都会被转义
function SaferHTML(templateData) {
    let s = templateData[0];
    for (let i = 1; i < arguments.length; i++) {
        let arg = String(arguments[i]);

        // Escape special characters in the substitution.
        s += arg.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Don't escape special characters in the template
        s += templateData[i];
    }
    return s;
}
// 这里sender变量是用户提供的，经过SaferHTML函数处理，里面的特殊字符都会被转义
// 我们来测试一下，为sender提供一段恶意代码，写在函数前    // let sender = '<script>alert("abc")</script>';  // 恶意代码
console.log(message);   //  <P>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</P>

// 标签模板的另一个应用，是多元转换(国际化处理)
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`

