//  Symbol.for() 接受一个字符串作为参数，然后搜索有无同名的Symbol值，如果有就返回这个Symbol值，否则新建一个以该字符串为名称的Symbol值，并将其注册到全局
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2  //  true
// 虽然它们都是Symbol值，但是它们都是由同样参数的Symbol.for()方法生成的，所以实际上是同一个值
// 因此，Symbol.for()和Symbol()都会生成新的symbol，但Symbol.for会被登记在全局环境中搜索，它会先检查给定的key是否一簇在
Symbol.for('bar') === Symbol.for('bar')  // true
Symbol('bar') === Symbol('bar')    //  false


// Symbol.keyFor()  返回一个已登记的Symbol类型值的key
console.log(Symbol.keyFor(s1))  //   foo  Symbol.foo为Symbol登记的名字是全局环境的，不管有没有在全局环境运行(即使在函数内部生成，仍然会登记在全局环境)

