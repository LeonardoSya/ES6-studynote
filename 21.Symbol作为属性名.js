/*
    由于每一个symbol值都是不等的，这意味着symbol值也可以作为标识符，用于对象的属性名，这样就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某个键被不小心改写或覆盖

*/
const mySymbolName = Symbol();
const a = {};
a[mySymbolName] = 'Hello';     //  将对象的属性名指定为一个Symbol值  要用方括号
// a.mySymbolName = 'Hello';  //  注意：不能用点运算符，因为点运算符后面总是字符串，所以不会读取mySymbolName作为标识符所指代的那个值，导致a属性名实际上是一个字符串而不是一个symbol值

// 同理，在对象内部使用Symbol值定义属性时，【Symbol值必须放在方括号】之中
const s = Symbol();
let obj = {
    [s]: function (arg) { }
};
obj[s](123);

// 定义一组常量 保证这组常量的值都是不相等的
const log = {};
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');

// 常量使用Symbol值最大的好处就是其他任何值都不可能有相同的值，因此可以保证下面这个switch语句会按设计的方式工作
const RED = Symbol();
const GREEN = Symbol();
function getComplement(color) {
    switch (color) {
        case RED: return GREEN;
        case GREEN: return RED;
        default: throw Error('Undefined color');
    }
}

//  另外，Symbol值作为属性名时，该属性是公开属性而不是私有属性

