//  ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量
// CommonJS模块
let { stat, exists, readfile } = require('fs');  // 实质是整体加载fs模块(加载fs的所有方法)  这种加载是 运行时加载 ，因为只有在运行时才能得到这个对象，导致完全没法在编译时做静态优化
import exp from 'constants';
// ES6模块
import { stat, exists, readFile } from 'fs';  // 实质是从fs模块加载3个方法 其他方法不加载   这种加载称为 编译时加载/静态加载 效率更高但是没法引用es6模块本身(因为它不是对象)


//  import()  
//  import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行
//  import()类似Node的require方法，区别主要是import()是异步加载，后者是同步加载

// 注意：import()加载模块成功后，这个模块会作为一个对象，当作then方法的参数，因此可以使用对象解构赋值的语法，获取输出接口
import('xxx.js').then(({ export1, export2 }) => {
    // ...
});


// export default
// 该命令为模块指定默认输出，用户不需要阅读文档了解模块有哪些属性和方法
export default function () {
    console.log('foo');
}
// 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字
import customName from 'xxx.js';   // 注意，这时文件名不需要加大括号
customName();  // foo
// 上面代码的Import命令，可以用任意名称指向指定默认输出的模块，这时候就不需要知道原模块输出的函数名。

// 浏览器允许脚本异步加载
/*
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
*/
//  defer是“渲染完再执行(DOM结构完全生成)”，async是“下载完就执行”

// 浏览器加载es6模块，需要加入 type="module" 属性
<script type="module" src="./foo.js"></script>   //  由于type属性设为module，所以浏览器知道这是一个 ES6 模块。


//  Node.js 要求 ES6 模块采用.mjs后缀文件名，并且默认启用严格模式 不必再每个模块文件顶部指定 use strict
// 也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名

// 如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。
// {
//     "type": "module"
// }