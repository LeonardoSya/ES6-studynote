// function* 这种声明方式会定义一个 生成器函数(generator function),它返回一个Generator对象
function* generator2(i) {
    yield i;
    yield i + 1;
}
const gen = generator2(10);
console.log(gen.next().value)  // 10
console.log(gen.next().value)  // 11

// yield* 表示将执行权移交给另一个生成器函数（当前生成器暂停执行）
// 如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加 * ，表面它返回的是一个遍历器对象
// yield* 的示例
function* anotherGenerator(i) {
    yield i + 1;
}
function* generator(i) {
    yield i;
    yield* anotherGenerator(i);  // 移交执行权
    yield i + 10;
}
var genn = generator(10);
console.log(genn.next().value);  // 10
console.log(genn.next().value);  // 11
console.log(genn.next().value);  // 20

