// js对象继承是通过原型链视线的，es6提供了更多原型对象的操作方法

// 1. __proto__ 用来读取或设置当前对象的原型对象(prototype)
// __proto__前后的双下划线，说明它本质上是一个内部属性而不是一个正式的对外api
//**    Object.setPrototypeOf()  写操作   */
//**    Object.getPrototypeOf()  读操作   */
//**    Object.create()          生成操作   */
// 实现上，__proto__调用的是Object.prototype.__proto__，具体实现如下：
Object.defineProperty(Object.prototype, '__proto__', {
    get() {
        let _thisObj = Object(this);
        return Object.getPrototypeOf(_thisObj);
    },
    set(proto) {
        if (this === undefined || this === null) {
            throw new TypeError();
        }
        if (!isObject(this)) {
            return undefined;
        }
        if (!isObject(proto)) {
            return undefined;
        }
        let status = Reflect.setPrototypeOf(this, proto);
        if (!status) {
            throw new TypeError();
        }
    },
});
function isObject(value) {
    return Object(value) === value;
}
// 如果一个对象本身部署了__proto__属性,该属性的值就是对象的原型
Object.getPrototypeOf({ __proto__: null })  //  null

//**    Object.setPrototypeOf()  */
// 该方法作用与__proto__相同，用来设置一个对象的原型对象prototype 返回参数对象本身，这是es6推荐的设置原型对象的方法
// 格式
Object.setPrototypeOf(object, prototype)
// 用法
const o = Object.setPrototypeOf({}, null);
// 该方法等同于下面的函数：
function setPrototypeOf(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}
// 下面是一个例子
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);  // 将proto对象设为obj对象的原型，因此可以从obj对象中读取处proto对象的属性(obj继承了proto)
proto.y = 20, proto.z = 40;
obj.y  // 20

//**    Object.getPrototypeOf() */
// 该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象
// Object.getPrototypeOf(obj)
function Rectangle() {
    // ...
}
const rec = new Rectangle();
Object.getPrototypeOf(rec) === Rectangle.prototype  //  true   
Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype  //  false

