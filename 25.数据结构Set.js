// 新的数据结构Set,它类似数组，但成员的值都是唯一的
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));  // 通过add()方法向Set结构加入成员，结果表明Set结构不会添加重复值
for (let i of s) {
    console.log(i);  //  2 3 5 4 
}
// Set函数可以接受一个数组(或具有Iterable接口的其他数据结构)作为参数，用来初始化
const set = new Set([1, 2, 3, 4, 4]);
console.log(...set);  // 1 2 3 4
// 数组去重
let arr = [1, 1, 2, 3, 4];
console.log([...new Set(arr)]);  // 1 2 3 4
// 字符串去重
console.log([...new Set('aaab')].join(''));  // ab
// 向Set加入值时，不会发生类型转换，因此 5 和 '5'是两个不同的值。Set内部判断两个值是否不同使用的算法类似===，另外，Set中两个对象总是不相等的

//**    Set实例的属性和方法  */
// 属性
Set.constructor // 构造函数，创建Set对象，其可以存储任意类型的唯一值
Set.size  // Set实例的成员数量

// 方法 分为操作方法和遍历方法
// 操作方法
Set.add(value)  // 添加某个值 返回Set结构本身
Set.delete(value)  // 删除某个值 返回一个布尔值表示删除是否成功
Set.has(value)  // 返回布尔值
Set.clear()  // 清除所有成员 没有返回值

// 对比 Object结构 和 Set结构

const obj = {
    name: 'zyy',
    age: '18'
};
if (obj.name) { }

const setTest = new Set();
setTest.add('name');
setTest.add('age');
if (setTest.has('name')) { }

// Array.from方法可以将Set结构转为数组  这就提供了数组去重的另一种方法
function dedupe(array) {
    return Array.from(new Set(array));
}
dedupe([1, 2, 2, 3, 3])   //  [1,2,3]

// 遍历方法
Set.keys()  // 返回 键名的遍历器
Set.values()  // 返回 键值的遍历器  // 由于Set结构没有键名只有键值，所以key是方法和values方法的行为完全一致
Set.entires()  // 返回 键值对的遍历器
Set.forEach()  // 使用回调函数遍历每个成员
// Set遍历的顺序就是插入顺序，这个特性有时非常有用，比如使用Set保存一个回调函数列表，调用时就能保证按照添加顺序调用

// Set结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法
Set.prototype[Symbol.iterator] === Set.prototype.values  // true
// 这意味着，可以省略values方法，直接用for...of 循环遍历Set
let setIt = new Set(['red', 'green', 'blue']);
for (let x of setIt) {
    console.log(x);
}
// 扩展运算符(...)内部使用for...of循环，所以也可以用于Set结构
console.log(...setIt)  // red green blue

let a = new Set([1, 2, 3]);
let b = new Set([2, 3, 4]);
// 并集 Union
let union = new Set([...a, ...b]);   //  Set(4) { 1, 2, 3, 4 }
// 交集 Intersect
let intersect = new Set([...a].filter(x => b.has(x)));   // Set(2) { 2, 3 }
// 差集 Difference
let difference = new Set([...a].filter(x=>!b.has(x)));  // set(1) { 1 }

