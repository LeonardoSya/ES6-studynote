//  es6提供了更接近传统语言的写法，引入class类作为【对象的模板】，class可以看作只是一个语法糖，它的绝大部分功能es5都能做到，class写法只是让对象原型的写法更加清晰，更像面向对象编程的语法而已
class Point {
    constructor(x, y) {   // 构造方法
        this.x = x;
        this.y = y;
    }           // 方法之间不需要逗号分隔
    toString() {   // 定义类的方法时，前面不需要加function
        return `(${this.x},${this.y})`;
    }
}
//  es6的类，完全可以看作构造函数的另一种写法  类 的数据类型就是函数，类本身就指向构造函数  使用的时候也是new，和构造函数用法一致
var point = new Point(1, 2);
point.toString()
// 构造函数的prototype属性，在es6的“类”上面继续存在，事实上类的所有方法都定义在类的prototype属性上面
class Exam {
    constructor() { }
    toString() { }
    toValue() { }
}
// 等同于  
Point.prototype = {
    constructor() { },
    toString() { },
    toVlaue() { },
}
// 因为类的方法都定义在prototype对象上面，所以【类的新方法】可以添加在prototype对象上  Object.assign方法可以很方便地一次向类添加多个方法
Object.assign(Point.prototype, {
    stop() { },
    pass() { }
})


//  constructor方法
//  constructor方法是类的默认方法，new生成对象实例时自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加
//  constructor方法默认返回实例对象(即this) 完全可以指定返回另外一个对象
class Foo {
    constructor() {
        return Object.create(null);
    }
}
new Foo() instanceof Foo  // false  constrcutor函数返回一个全新的对象
// 另外，实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层
class IncreasingCounter {
    // constructor() {
    //     this._count = 0;
    // }
    _count = 0;    // 实例对象自身的属性 定义在类的头部
    get value() {
        return this._count;
    }
    increment() {
        this._count++;
    }
}
// 这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，可读性比较好

// 类的实例
// 实例的属性除非显式定义在其本身(即定义在this对象上)，否则都是定义在原型上(即定义在class上)
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return this.x + this.y;
    }
}
var point = new Point(1, 2);
point.toString()  // 3
point.hasOwnProperty('x')   // true
point.hasOwnProperty('toString')     //  false
point.__proto__.hasOwnProperty('toString')   //  true
// x和y都是实例对象point的自身属性(因为定义在this变量上)，而toString是原型对象的属性
// 另外，与es5一样，类的所有实例对象共享一个原型对象  这也意味着可以通过【实例的__proto__属性】为类添加方法
var point2 = new Point(2, 3);
point.__proto__ === point2.__proto__   // true

// 类内部get和set关键字，对某个属性设置存值函数和取值函数，【拦截该属性的存取行为】
class MyClass {
    constructor() {
        // ...
    }
    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log('setter:' + value);
    }
}
var inst = new MyClass();
inst.prop  // getter
inst.prop = 123  // setter:123  123
// 这段代码中 prop属性有对应的存值函数和取值函数，因此【赋值和读取行为 都被自定义了】

// 存值和取值函数是设置在属性的Descriptor对象上的
class CustomHTMLElement {
    constructor(element) {
        this.element = element;
    }
    get html() {
        return this.element.innerHTML;
    }
    set html(value) {
        this.element.innerHTML = value;
    }
}
var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, "html");
// 上面代码说明，存值和取值函数定义在html属性的描述对象上

// 属性表达式
let methodName = 'getArea';
class Square {
    constructor() { }
    [methodName]() { }  // 该类的方法名getArea是从表达式得到的
}
var test = new Square();
test.__proto__.hasOwnProperty('getArea')   // true

// Class表达式
// 与函数一样，类也可以使用表达式的形式定义
var TheClass = class Me {     // 使用表达式定义一个叫做 Me 的类
    getClassName() {
        return Me.name;
    }
};
// 但是表达式定义的类只能在Class内部使用，指代当前类。在Class外部，这个类只能用TheClass引用
var inst = new TheClass();
inst.getClassName()   //  Me
// 采用class表达式，可以写出立即执行的class
let person = new class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}('zyyy');
person.sayName();   // zyyy  person是一个立即执行的类的实例

// 注意点：
// (1)严格模式：类和模块的内部默认就是严格模式，不需要use strict指定运行模式。es6实际上把整个语言升级到了严格模式
// (2)不存在提升：类不存在变量提升，不会把类的声明提升到代码头部。必须保证子类在父类之后定义
// (3)this指向：类的方法内部的this默认指向类的实例  
class Logger {
    printName(name = 'zyy') {
        this.print(`Hello ${name}`);   // printName方法中的this默认指向Logger的实例(logger)
    }
    print(text) {
        console.log(text)
    }
    constructor() {
        this.printName = this.printName.bind(this);  //  在构造方法中绑定this，这样就不会找不到Print方法了
    }
}
const logger = new Logger();
const { printName } = logger;   // printName方法中的this默认指向Logger的实例(logger)
// 但是如果将这个方法提取出来单独使用，this会指向该方法运行时所在环境(由于class内部是严格模式，所以this实际指向undefined)，从而报错
// 解决：在构造方法中绑定this，这样就不会找不到Print方法了 
printName()   // hello zyy



// 静态方法
// 类相当于实例的原型，在所有类中定义的方法，都会被实例继承。如果在一个方法前加上 static 关键字，就表示该方法【不会被实例继承】，而是【直接通过类来调用】，这是静态方法
class Foo {
    static classMethod() {
        console.log(this);  // [class Foo]
        return 'hello';
    }
}
var foo = new Foo();
foo.classMethod()   //  TypeError: foo.classMethod is not a function
// 注意，如果静态方法包含this关键字，这个this指向的是类，而不是实例
// 另外，同一个类中静态方法可以和非静态方法重名

// 静态属性
// 静态属性是Class本身的属性，即 Class.propName，而不是定义在实例对象上的属性
class Foo {
    static prop = 1;
}


// 私有方法和私有属性
// 私有方法和私有属性，是只能在类内部访问的方法和属性，外部不能访问，这样有利于代码的封装
class MyClass {
    #count = 0;   // 只能在类的内部使用 (this.#count) 
    #sum() {
        return this.#count;
    }
    printSum() {
        console.log(this.#sum());
    }
}
// const counter = new MyClass()
// counter.#count  // 报错
const counter = new MyClass()
counter.printSum()
// 另外，私有属性和私有方法前，也可以加上static关键字，表示这是一个静态的私有属性活私有方法


// Class的继承
class Point { }
class ColorPoint extends Point {     // 通过 extends 关键字继承Point类的所有属性和方法
    constructor(x, y, color) {
        super(x, y);            // 调用父类的constructor(x,y)
        this.color = color;
    }
    toString() {
        return this.color + ' ' + super.toString();   // 调用父类的toString
    }
}
//  super关键字在这里表示父类的构造函数，用来新建父类的this对象
// 【子类必须在constructor中调用super方法】，否则新建实例会报错，这是因为子类自己的this对象必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象
// 如果子类没有定义constructor方法，这个方法会被默认添加
class ColorPoint extends Point {
    constructor(...args) {
        super(...args);
    }
}
// 另外，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则报错，这是因为子类实例的构建基于父类实例，并且只有super方法才能调用父类实例
class Point {
    constructor(x,y) {
        this.x=x;
        this.y=y;
    }
}
class ColorPoint extends Point {
    constructor(x,y,color) {
        this.color = color;  // 报错 因为子类的constructor方法不能再调用super之前就使用this
        super(x,y);
        this.color = color;  // 正确
    }
}
let cp = new ColorPoint(25,8,'green');    // 生成子类实例
// 另外，父类的静态方法也会被子类继承

// 判断一个类是否继承了另一个类：
Object.getPrototypeOf(ColorPoint)  === Point  // true


// 类的prototype属性和__proto__属性
// 子类的__proto__属性表示构造函数的继承，指向它的父类。
// 子类prototype的__proto__属性表示方法的继承，指向它父类的prototype
class A { }
class B extends A { }
B.__proto__ === A   // true
B.prototype.__proto__ === A.prototype    // true
// 因为B的实例继承了A的实例，B继承了A的静态方法