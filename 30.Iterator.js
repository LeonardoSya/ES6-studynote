/*
    Iterator 为不同数据结构提供统一的访问机制，可实现任何数据结构的遍历操作
*/

// Array,Object,Map,Set有四种数据集合。lterator是一种接口，为各种不同数据结构提供给统一的访问机制，任何数据结构只要部署了lterator接口，就可以完成遍历操作
// lterator遍历过程：创建一个指针对象，指向当前数据结构的起始位置(遍历器对象本质是一个指针对象)，然后不断调用指针对象的next方法，直到它指向数据结构的结束位置，
// 每一次调用next方法都会返回数据结构的当前成员的信息，具体来说是返回一个包含value和done两个属性的对象，其中value实现是【当前成员的值】，【done属性是一个布尔值，表示遍历是否结束】

// 遍历器实现next方法源码：
function makeIterator(array) {
    var nextIndex = 0;
    return {
        next: function () {
            return nextIndex < array.length ? { value: array[nextIndex++] } : { done: true };
        }
    };
}

// 遍历器的next方法
// 假设容器iterator是一个指针p，程序开始时p指向列表首地址的前一个地址，iterator(即指针)通过调用hasnext()方法，判断下一个地址是否存在元素(返回布尔值)。
// 如果下一地址有元素，则调用调用next()方法，将该地址的元素值返回给定义的变量，调用next()方法后，指针p会自动移向下一元素的地址


// 默认lterator接口
// lterator接口的目的就是为所有数据结构提供了一种统一的访问机制，即for..of循环，当使用for...of循环遍历某种数据结构时，该循环会自动去寻找Lteartor接口
// 一种数据结构只要部署了lterator接口，我们就称这种数据结构是可遍历的(lterable)
// 默认的lterator接口部署在数据结构的Symbol.iterator属性


/*
原生具备 Iterator 接口的数据结构如下。
Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象
 */


// 调用Iterator接口的场合 
// (1) 解构赋值  数组和Set
let set = new Set().add('a').add('b').add('c');
let [x, y] = set;
x, y;  // a b
let [first, ...rest] = set;
first, rest;  //  a [ 'b', 'c' ]

// (2) 扩展运算符
var str = 'hello';
[...str]     //   [ 'h', 'e', 'l', 'l', 'o' ]
let arr = ['b', 'c'];
['a', ...arr, 'd']   //  [ 'a', 'b', 'c', 'd' ]

// 任何部署了Iterator接口的数据结构都可以转为 数组(可以使用扩展运算符)


// 字符串的Symbol.iterator方法源码
var str = new String("hello");
console.log([...str])


str[Symbol.iterator] = function () {
    return {
        next: function () {
            if (this._first) {
                this._first = false;
                return { value: "world", done: false };
            } else {
                return { done: true };
            }
        },
        _first: true
    };
};

console.log([...str]);  // str的Symbol.iterator方法被修改了，所以扩展运算符(...)返回的值变成了world,而字符串本身还是hello
console.log(`${str}`);


// 遍历器对象的return()和throw()
// 如果for..of循环提前退出，就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法
// 注意，return方法必须返回一个对象，这是Generator规格决定的
