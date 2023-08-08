// js的对象Object，本质上是键值对的集合(Hash结构),但是传统上只能用字符串作为键名
// Map数据结构类似对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值(包括对象)都可以当作键，也就是说Map结构提供“值-值”的对应，是一种更完善的hash结构实现，如果你需要键值对的数据结构，Map比Object更合适

// Map作为构造函数，可以接受一个数组作为参数，该数组的成员是一个个表示键值对的数组
const map = new Map([['name', 'rara'], ['title', 'author']]);
console.log(map)   //  Map(2) { 'name' => 'rara', 'title' => 'author' }
// Map构造函数接受数组作为参数的实际运行算法：
const mapTest = new Map();
items.forEach(
    ([key, value]) => map.set(key, value)
);

// Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键，这样解决了同名属性碰撞(clash)的问题。我们在扩展别人的库的时候，如果使用对象作为键名，就不用担心clash问题
const k1 = ['a'];
const k2 = ['a'];
map.set(k1, 111).set(k2, 222);
map.get(k1);  //  111
map.get(k2);  //  222
// 也就是说，如果Map的键是一个简单类型的值，只要两个值严格相等就被视作一个键，复杂数据类型则与内存地址绑定

// Map.prototype.set(key,value)  设置键名key对应的键值为value，然后返回整个Map结构
// set方法返回的是当前的Map对象，因此可以采用链式写法
let ma = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
// Map.prototype.get(key)  读取key对应的键值
// Map.prototype.has(key)  返回一个布尔值，表示某个键是否在当前Map对象之中
// Map.prototype.delete(key)  删除某个键，返回布尔值
// Map.prototype.clear()  清除所有成员，没有返回值

// // 遍历方法
// Map.prototype.keys()：返回键名的遍历器。
// Map.prototype.values()：返回键值的遍历器。
// Map.prototype.entries()：返回所有成员的遍历器。
// Map.prototype.forEach()：遍历 Map 的所有成员。
// 需要注意的是，Map的遍历顺序就是插入顺序

// Map结构转为数组结构 使用扩展运算符(...)
[...map]







