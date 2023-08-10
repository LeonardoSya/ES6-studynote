// (1) 块级作用域

// let完全可以取代var，因为两者语义相同，而且let没有副作用。
// 因为变量应该只在其声明的代码块内有效，var命令做不到这一点。var命令存在变量提升效用，let命令没有这个问题。

// const 优于 let，体现在const比较符合函数式编程思想(运算不改变值只新建值)，这样有利于分布式运算
// 另外，js编译器会对const进行优化，多使用const有利于提高程序运行效率。let和const本质区别其实是编译器内部的处理不同

// bad 
var a=1,b=2,c=3;
// good
const [a,b,c] = [1,2,3];

// 另外，所有的函数都应该设置为常量


// (2) ESLint 是一个语法规则和代码风格检查工具，可以用来保证写出语法正确、风格统一的代码
/*
    $ npm i -g eslint
    $ npm i -g eslint-config-airbnb
    $ npm i -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
    $ eslint --init
*/


// 这样就可以检查，当前项目的代码是否渡河预设的规则
// 检查index.js:  $ eslint index.js


// (3)