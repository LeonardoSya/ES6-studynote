
//  this关键字总是指向函数所在的当前对象，super关键字指向当前对象的原型对象
const proto = {
    foo: 'hello'
};
const obj = {
    foo: 'world',
    find() {
        return super.foo;  // 引用原型对象proto的foo属性  
    }
};
Object.setPrototypeOf(obj, proto);
console.log(obj.find());  // hello


// 在类中的 super 关键字：
// 1. super 作为函数调用时，代表父类的构造函数，es6要求子类的构造函数必须执行一次super函数
class A { }
class B extends A {
    constructor() {
        super();   // super作为函数时，只能用在子类的构造函数中，用在其他地方会报错
    }
}
// 2. super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中指向父类
class A {
    p() {
        return 2;
    }
}
class B extends A {
    constructor() {
        super();
        console.log(super.p());
    }
}
let b = new B();