/*
    symbol是一种基本数据类型(primitive data type)
    symbol函数会返回symbol类型的值，该类型具有静态属性和静态方法
    它的静态属性会暴露几个内建的成员对象；
    它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"

    每个从Symbol()返回的symbol值都是唯一的
    一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的

    因此，对象的属性名现在可以有两种类型：一种是原有的字符串，另一种是Symbol类型。Symbol类型的属性名能够保证不会与其他属性名产生冲突
    Symbol函数钱不能new，因为【生成的Symbol是一个原始类型的值而不是对象】，所以不能添加属性
    基本上，它是一种类似于字符串的数据类型

    Symbol值不能与其他类型的值进行运算，会报错
*/

const sym1 = Symbol();
console.log(typeof sym1);   // symbol
const sym2 = Symbol(11);
console.log(sym2 === 11);   // false
const sym3 = Symbol('foo');
console.log(sym3.toString());   //  symbol(foo) 
console.log(Symbol('foo') === Symbol('foo'));    //  false  说明每个从Symbol() 返回的symbol值都是唯一的

/*
    语法：Symbol([description])  参数是可选的，类型是String，表示对Symbol实例的描述，主要是为了在控制台显示，可用于调试但不是访问symbol本身，或者转为字符串时为了容易区分
*/

const s1 = Symbol();
const s2 = Symbol('foo');
const s3 = Symbol('foo');
// 创建了三个新的symbol类型。注意：Symbol('foo)不会强制将字符串'foo'转换成symbol类型。它每次都会创建一个新的symbol类型

// symbol值可以显式转换为字符串，也可以转为布尔值。但不能转为数值
const s4 = Symbol('My Symbol');
s4.toString();   //  Symbol(My Symbol)
Boolean(s4);     // true
// Number(s4);      // TypeError
// s4 + 2;          // TypeError


//  Symbol.prototype.description
//  创建Symbol的时候可以添加一个描述，ES2019提供了一个实例属性description，直接返回Symbol的描述
const s5 = Symbol('foo');
s5.description    // foo



