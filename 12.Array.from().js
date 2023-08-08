//  Array.from方法用于将两类对象转为真正的数组: (伪数组)类似数组的对象(array0-like object)和可遍历的对象(包括es6新增的Set和Map)

//  这是一个类似数组的对象，Array.from将它转为真正的数组
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
let arr = Array.from(arrayLike);   //  [ 'a', 'b', 'c' ]

//  实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象
// NodeList对象
let ps = document.querySelectorAll('p');  // querySelectorAll方法返回的是一个类似数组对象(伪数组)，可以将这个对象转为真正的数组后再使用filter方法
Array.from(ps).filter(p => {
    return p.textContent.length > 100;
});
// arguments对象
function foo() {
    var args = Array.from(arguments);
}
// 部署了lterator接口的数据结构，Array.from都能将其转为数组
Array.from('hello')   //  字符串具有lterator接口
let namesSet = new Set(['a', 'b'])   // Set结构也有lterator接口
Array.from(namesSet)


//  Array.from 还可以接受第二个参数，作用类似数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
Array.from([1, 2, 3], (x) => x * x);  //  [1,4,9]
// 取出DOM节点的文本内容
let spans = document.querySelectorAll('span.name');
let names = Array.om(spans, s => s.textContent);
// 将数组中布尔值为false的成员转为0
Array.from([1, , 2, , 3], (n) => n || 0)  //  [1,0,2,0,3]
// 返回各种数据的类型
function typesOf() {
    return Array.from(arguments, value => typeof value);
}
typesOf(nul, [], NaN)   //  ['object', 'object', 'number']
