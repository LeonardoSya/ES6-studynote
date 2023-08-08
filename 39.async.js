// es2017引入  async函数是Generator函数的语法糖(语法糖提高程序的可读性)
// async函数是 将 * 替换成 async，将 yield 替换成 await，仅此而已
const asyncReadFIle = async function () {
    const f1 = await readFile('');
    console.log(f1.toString());
};

// async函数对Generator函数的改进：
// 1. 内置执行器
// Generator函数的执行必须依靠执行器，所以才有了co模块，而async函数自带执行器，也就是说async函数的执行与普通函数一样，只要一行
asyncReadFIle();    //  调用asyncReadFile函数后它就会自动执行，最后输出结果。这完全不像Generator函数需要调用next函数或co模块，才能真正执行
// 2. 适用性
// 之前yield命令后面只能是Thunk函数或Promise对象，而async函数的await命令后面，可以是Promise对象和原始类型的值(num\str\bool,但会自动转成立即resolved的Promise对象)
// 3. 语义
// async表示函数里有异步操作(sync)，await表示紧跟在后面的表达式需要等待结果(await)
// 4. 返回值是Promise
// async函数返回值是Promise对象，这比Generator函数返回值是Iterator对象方便多了，因为可以用then方法指定下一步操作
// 进一步说，async函数完全可以看作多个异步操作包装成的一个Promise对象，而await命令就是内部then命令的语法糖



// 用法
// async函数返回一个Promise对象，可以用then方法添加回调函数，当函数执行的时候，一旦遇到await就会先返回，等异步操作完成，再接着执行函数体内后面的语句
// 指定500毫秒后，输出hello world
async function timeout(ms) {   // 由于async函数asyncPrint返回的是Promise对象，因此可以作为await命令的参数
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}

asyncPrint('hello world', 500);

// async函数有多种使用形式
// 函数声明
async function foo() { }
// 函数表达式
const foo = async function () { };
// 对象的方法
let obj = { async foo() { } };
obj.foo().then()
// Class 的方法
class Storage {
    constructor() {
        this.cachePromise = caches.open('avatars');
    }
    async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
    }
}
const storage = new Storage();
storage.getAvatar('jake').then();
// 箭头函数
const foo = async () => { };



//  语法
// 1. 返回Promise对象  
// async函数内部return返回的值,会成为then方法回调函数的参数
async function f() {
    return 'hello';
}
f().then(v => console.log(v))  // hello   then方法回调函数会接收到return的值
// async内部抛出的错误,会导致返回的Promise对象变为reject状态, 抛出的错误对象会被catch方法回调函数接收到
async function fn() {
    throw new Error('出错了');
}
fn().then(
    v => console.log(v),
    e => console.log(e)   // Error: 出错了...
)

// 2. Promise对象的状态变化
async function getTitle(url) {
    let response = await fetch(url);  // 抓取网页
    let html = await response.text();  // 取出文本
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];  // 匹配页面标题
}
getTitle('...url').then(console.log)   // 三个异步操作全部完成后，才会执行then方法里的log
// async函数返回的Promise对象，必须等到内部所有await命令后面的Promise对象执行完，才会发生状态改变，除非遇到return或抛出错误。
// 也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数

// 3. await命令
// await命令后一般是一个Promise对象，返回该对象的结果。如果不是Promise对象，就直接返回对应的值
// 另一种情况是，await命令后面是一个thenable对象(定义了then方法的对象)，那么await会将其等同于Promise对象
// 实现休眠效果  借助await命令可以让程序停顿指定时间
function sleep(interval) {
    return new Promise(resolve => {
        setTimeout(resolve, interval);
    })
}
async function one2FiveInAsync() {
    for (let i = 1; i <= 5; i++) {
        console.log(i);
        await sleep(1000);
    }
}
one2FiveInAsync();  // 1 2 3 4 5

// await命令后面的Promise对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到
async function f() {
    await Promise.reject('出错了');
}
f()
    .then(v => console.log(v))
    .catch(e => console.log(e))  // 出错了 
// 因此，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中
async function myFunction() {
    try {
        await somethingThatReturnsAPromise();
    } catch (err) {
        console.log(err);
    }
}
// 另外，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发
let [foo, bar] = await Promise.all([getFoo(), getBar()]);  // 两个独立的异步操作(即互不依赖)，写成同时触发，这样能够缩短程序的执行时间
// 另外，await只能用在async函数中，如果用在普通函数中就会报错
// 另外，async函数可以保留运行堆栈
const a = async () => {
    // b().then(() => c());
    await b();
    c();
};  // 当异步任务b()运行时，a()是暂停执行的，上下文环境都保存着，一旦b()或c()报错，错误堆栈将包括a()

//  例子：假定某个DOM元素上面，部署了一系列动画，前一个动画结束才能开始后一个，如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值
async function chainAnimationAsync(elem, animations) {
    let ret = null;
    try {
        for (let anim of animations) {
            ret = await anim(elem);  // 返回成功执行的动画的返回值
        }
    } catch (err) {
        // 忽略错误，继续执行
    }
    return ret;
}


// 实例 远程读取一组url，然后按照读取顺序输出结果
async function logInOrder(urls) {
    // 并发读取远程url
    const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
    });
    // 按次序输出
    for (const textPromise of textPromises) {
        console.log(await textPromise);
    }
}