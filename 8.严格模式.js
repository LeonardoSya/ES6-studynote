//  从es5开始，函数内部可以设定为严格模式
/**
严格模式主要有以下限制。

    变量必须声明后再使用
    函数的参数不能有同名属性，否则报错
    不能使用with语句
    不能对只读属性赋值，否则报错
    不能使用前缀 0 表示八进制数，否则报错
    不能删除不可删除的属性，否则报错
    不能删除变量delete prop，会报错，只能删除属性delete global[prop]
    eval不会在它的外层作用域引入变量
    eval和arguments不能被重新赋值
    arguments不会自动反映函数参数的变化
    不能使用arguments.callee
    不能使用arguments.caller
    禁止this指向全局对象
    不能使用fn.caller和fn.arguments获取函数调用的堆栈
    增加了保留字（比如protected、static和interface）
    
 */

//  es6规定，只要函数参数使用了默认值、解构赋值、扩展运算符，那么函数内部就不能显示地设定为严格模式吗，否则报错
function doSomething(a, b) {
    'use strict';
}
const doSomething = function ({ a, b }) {
    'use strict';
}
/*
Error:
    'use strict';
    ^^^^^^^^^^^^
*/

// 两种方法可以规避这种限制，第一种是设定全局的严格模式，这是合法的
'use strict';
function doSomething(a, b = a) { }

// 第二种是把函数包在一个无参数的立即执行函数里面
const doSomething = (function () {
    'use strict';
    return function (value = 42) {
        return value;
    };
}());