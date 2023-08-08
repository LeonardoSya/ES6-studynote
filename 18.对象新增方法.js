//**    1. Object.is()  */
// Object.is用来比较两个值是否严格相等，与严格比较运算符(===)的行为基本一致,不同之处在于 +0!==-0, NaN等于自身
+0 === -0 // true
NaN === NaN // false
Object.is(+0, -0)  // false
Object.is(NaN, NaN)  // true

// es5可以通过下面代码，部署Object.is
Object.defineProperty(Object, 'is', {  // Object.defineProperty()静态方法会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象
    value: function (x, y) {
        if (x === y) {
            return x !== 0 || 1 / x === 1 / y;  // 针对 +0 !== -0的情况
        }
        return x !== x && y !== y;  // 针对NaN的情况
    },
    configurable: true,  // 能否通过delete删除属性、能否修改属性
    enumerable: true,    // 可枚举(遍历)
    writable: true       // 能否修改属性值(可写\可读)
});


//**    2. Object.assign() */
// 用于对象的合并，将源对象(source)的所有可枚举属性，复制到目标对象(target)
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
target // { a: 1, b: 2, c: 3 }
// 第一个参数是target，后面的参数都是源对象
// 如果目标对象与源对象有【同名属性】，或多个源对象有同名属性，则后面的会覆盖前面的属性
const target1 = { a: 1, b: 2 };
const source11 = { b: 3 };
console.log(Object.assign(target1, source11));   // { a: 1, b: 3 }
// 注意，Object.assign只拷贝源对象的自身属性(不拷贝继承属性)，也不拷贝可枚举属性(enumerable:false)
Object.assign({ b: 'c' },
    Object.defineProperty({}, 'invisible', {  // 要拷贝的对象只有一个不可枚举属性invisible，这个属性没有被拷贝进去
        enumerable: false,
        value: 'hello'
    })
)
//  {b: 'c'}
//  属性名为Symbol值的属性，也会被Object.assign拷贝
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' });  // {a:'b', Symbol(c):'d}
//  Object.assign可以用来处理数组，但是会把数组视为对象

// Object.assign常见用途：
// (1)为对象添加属性
class Point {
    constructor(x, y) {
        Object.assign(this, { x, y });  // 将x属性和y属性添加到Point类的对象实例
    }
}
// (2)为对象添加方法
Object.assign(SomeClass.prototype, {
    someMethod(arg1, arg2) { },
    anotherMethod() { }
});
// 等同于下面的写法：
SomeClass.prototype.someMethod = function (arg1, arg2) { };
SomeClass.prototype.anotherMethod = function () { };
// 第一种Object.assign的写法使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用assign方法添加到SomeClass.prototype之中(对象原型)
// (3)克隆对象
function clone(origin) {
    return Object.assign({}, origin);
}
// 将原始对象拷贝到一个空对象，就得到了原始对象的克隆(但是不能克隆它的继承值)
// 如果要【保持继承链】，可以采用下面的代码：
function clone(origin) {
    let originProto = Object.getPrototypeOf(origin);  // 返回指定对象(origin)的原型
    return Object.assign(Object.create(originProto), origin); // Object.create(originProto)以originProto为原型，创建一个新的对象，然后把origin合并进这个新对象。这样就创建了一个包含origin自身与原型链的对象
}
// (4)将多个对象合并到某个对象
const merge = (target, ...sources) => Object.assign(target, ...sources);
//              多个对象                     合并到一个对象中
