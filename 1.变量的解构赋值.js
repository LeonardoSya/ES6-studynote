/* 数组的解构赋值 */

let [a, b, c] = [1, 2, 3];
let [, , third] = ['foo', 'bar', 'baz'];
let [head, ...tail] = [1, 2, 3, 4];  // head=1, tail=[2,3,4]
let [x, y, ...z] = ['a'];  // x='a' y=undefined z=[]
let [m, n] = [1, 2, 3];  // 不完全解构 m=1, n=2
// 解构赋值允许指定默认值
let [fo = true] = [];  // foo // true
let [s1, s2 = 'b'] = ['a'];  // s1='a' s2='b'
// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候才会求值
function f() {
    console.log('aaa');
}
let [p = f()] = [1];  // f()没有被调用，因为p能取到值(p=1)，没有用到p=f(), 说明默认值表达式是惰性求值的
// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明
let [n1 = n2, n2 = 1] = [];  // ReferenceError: n2 is not defined


/* 对象的解构赋值 */
let { foo1, bar1 } = { foo1: 'a', bar1: 'b' };
// 对象解构与数组解构有一个重要的不同：数组元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名才能正确取值
// 对象的解构赋值 可以很方便地【将现有对象的方法赋值到某个变量】
let { sin, cos, tan } = Math;
const { log } = console;
log('hello world');    //  等效于console.log()
// 如果变量名与属性名不一样，则需要这么写：
let obj = { first: 'hello', last: 'world' };
let { first: ff, last: ll } = obj;
console.log(ff, ll);   // hello world
// 这实际上说明，对象的解构赋值是下面形式的简写：
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
// 也就是说 对象的解构赋值的内部机制，是先找到同名属性，然后再赋值给对应的变量，[真正被赋值的是对应的变量 而不是同名属性]
let { foo: baz } = { foo: 'aaa' };
baz  // 'aaa
foo  // error: foo is not defined
// 解构也可以用于嵌套结构的对象
let obj1 = {
    p: [
        'hello',
        { y: 'world' }
    ]
};
let { p: [xx, { yy }] } = obj1;  // 注意：此时p是模式，不是变量，因此p不会被赋值    
xx  //  hello
yy  //  world
// 嵌套赋值
let obj2 = {};
let arr = {};
({ foo: obj2.prop, bar: arr[0] } = { foo: 123, bar: true });
obj  // {prop:123}
arr  // [true]
// 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错
let { foo3: { bar3 } } = { baz: 'baz' };  //  报错
// 上述代码中，等号左边对象的foo3属性对应一个子对象，该子对象的bar3属性在解构时报错。因为foo3此时等于undefined，再取子属性就会报错
//  对象的解构赋值可以取到继承的属性
const ob1 = {};
const ob2 = { fooo: 'bar' };
Object.setPrototypeOf(ob1, ob2);
const { fooo } = ob1;
fooo  // 'bar'
// 对象解构也可以指定默认值q
const { zz, cc = 3 } = { zz: 1 };
zz // 1
cc // 3
//  默认值生效的条件：对象的属性值严格等于undefined
var { x1 = 3 } = { x1: undefined };   //  x1=3
var { x2 = 3 } = { x2: null };    // x2=null
/* 注意点 */
// 如果要将一个已经声明的变量用于解构赋值，必须特别小心
// 错误的写法、
// let test_x;
// { test_x } = { test_x: 1 };
// 上述代码写法报错，因为js引擎将{x}理解为一个代码块，从而发生语法错误，只有不将大括号写在行首，避免js将其解释为代码块，才能解决这个问题
// 正确的写法：
let test_x;
({ test_x } = { test_x: 1 });
console.log(test_x);  // 1


/**  字符串的解构赋值  */
// 字符串也可以解构赋值，这是因为此时，字符串被转换成一个类似数组的对象
const [str1, str2, str3, str4, str5] = 'hello';
str1  //  'h'
str3  //  'l'
// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值
const { length: len } = 'hello';
len   //  5



/**  数值和布尔值的解构赋值  */
// 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象
let { toString: num1 } = 123;
num1 === Number.prototype.toString  // true
let { toString: bool } = false;
bool === Boolean.prototype.toString  // true
// 上面代码中，数值和布尔值的包装对象都有toString属性，因此变量num1和bool都能取到值
// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefinde和null无法转为对象，所以对它们解构赋值都会报错.



/**  函数参数的解构赋值  */
function add([x, y]) {  //  在传入参数的那一刻，数组参数就被解构成变量x和y了
    return x + y;
}
add([1, 2]);
// add的参数表面上是一个数组，但是【在传入参数的那一刻，数组参数就被解构成变量x和y了】，对于函数内部代码而言，它们能感受到的参数就是x和y了
[[1, 2], [3, 4]].map(([a, b]) => a + b);  //  [3.7]  另一个例子
// 函数参数的解构也可以使用 默认值
function move({ x = 0, y = 0 } = {}) {
    return [x, y];
}
console.log(move({ x: 3 }));  //  [3,0]  没有传入y，但是返回了y的默认值0
//  上述代码中 函数move的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值。如果解构失败，x或y则会传回默认值
//  下面代码说明，undefined就会触发函数参数的默认值
[1, undefined, 3].map((x = 'yes') => x);
//  [1, 'yes', 3]



/**  圆括号问题  */
// 对于编译器来说，一个式子到底是模式还是表达式必须解析到(或解析不到)等号才知道
// es6的规则是：只要有可能导致解构的歧义，就不应该使用圆括号。 因此，尽量不要在模式中放置圆括号



/**  解构赋值的用途  */
// 1. 交换变量的值
let test_x1 = 1;
let test_y1 = 2;
[test_x1, test_y1] = [test_y1, test_x1];
console.log(test_x1, test_y1);   //  2  1

// 2. 从函数返回多个值
// 函数只能返回一个值，如果要返回多个值就得把他们放在数组/对象中返回。解构赋值能够方便地取出这些值
function example() {
    // return [1, 2, 3];    /// 返回数组
    return {                /// 返回对象
        test_foo: 1,
        test_bar: 2
    };
}
// let [ex1, ex2, ex3] = example();
let { test_foo, test_bar } = example();
// console.log(ex1, ex2, ex3);   //  ex1 1   ex2 2   ex3 3
console.log(test_foo, test_bar); //  test_foo 1    test_bar 2

// 3. 函数参数的定义
// 解构赋值可以方便地将一组参数与变量名对应起来
function fn1([x, y, z]) {
    return [x, y, z];
}
fn1([1, 2, 3]);   //  参数是一组有次序的值
function fn2({ x, y, z }) {
    return { x, y, z };
}
console.log(fn2({ z: 1, y: 2, x: 3 }));   //   参数是一组无次序的值    //  { x: 3, y: 2, z: 1 }

//  !!  4. 提取JSON数据
let jsonData = {
    id: 1242315322,
    status: 'success',
    // data: [123, 18675]
    data: {
        username: 'username',
        password: 'password'
    }
};
let { id, status, data: myData } = jsonData;
console.log(id, status, myData.username, myData.password);

//  5. 指定函数参数的默认值
jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () { },
    cache = true,
    complete = function () { },
    crossDomain = false,
    global = true,
    //  ... more config
} = {}) {
    //  ... do stuff
};
//  指定了参数的默认值，避免了在函数体内部再写 var foo = config || 'default foo'; 这样的语句

//  6. 遍历 Map 结构
// 任何部署了 lterator 接口的对象，都可以采用 for...of 循环遍历，Map结构原生支持 lterator 接口，配合变量的解构赋值，获取键名和键值就非常方便
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {    // 采用for...of循环遍历map结构
    console.log(key + ' is ' + value);
}
// 如果只想获取键名或键值
for (let [, value] of map) {
    console.log('value' + ' : ' + value);
}

// !!!  7. 输入模块的指定方法
// 加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰
const { SourceMapConsumer, SourceNode } = require("source-map")



