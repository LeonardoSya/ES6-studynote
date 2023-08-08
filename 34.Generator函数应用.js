// 应用
// (1) 异步操作的同步化表达
// Generator函数的暂停执行的效果，意味着可以把异步操作卸载yield表达式里面，等到调用next方法时再往后执行，这实际上等同于不需要写回调了
// 因此，Generator函数的一个重要实际意义就是用来【处理异步操作，改写回调函数】
function* loadUI() {
    show();
    yield loadUIDataAsyncchronously();
    hide();
}
var loader = loadUI();    // 第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器，下次对该遍历器调用next方法，则会显示load界面并【异步加载数据loadUIDataAsynchronously】，等到数据加载完成，再next则会hide
loader.next()  // 加载UI
loader.next()  // 卸载UI
// 这种写法的好处是所有loading界面的逻辑，都被封装在一个函数，按部就班非常清晰

// Ajax是典型的异步操作，通过Generator函数部署Ajax操作，可以用同步的方式表达
function* main() {
    var result = yield request('http://some.url');
    var resp = JSON.parse(result);
    console.log(resp.value);
}
function request(url) {
    makeAjaxCall(url, function (response) {
        it.next(response);   //  注意：这里的next方法必须加上response参数，因为yield表达式本身没有值，总是等于undefined
    });
}
var it = main();
it.next();

function* numbers() {
    let file = new FileReader('test.txt');
    try {
        while (!file.eof) {
            yield parseInt(file.readLine(), 10);
        }
    } finally {
        file.close();
    }
}
// 上面代码打开文本文件，使用yield表达式可以手动逐行读取文件


// (2) 控制流管理
// 如果有一个多步操作非常耗时
// 采用promise
Promise.resolve(step1)
    .then(step2)
    .then(step3)
    .then(step4)
    .then(function (value4) { }, function (error) { })
    .done();
// 采用Generator函数改善代码运行流程
function* longRunningTask(value1) {
    try {
        var value2 = yield step1(value1);
        var value3 = yield step2(value2);
        var value4 = yield step3(value3);
        // ...
    } catch (e) {
        // ...
    }
}
scheduler(longRunningTask(initialValue));  // 然后用一个函数按次序自动执行所有步骤
function scheduler(task) {
    // 如果Generator函数未结束则继续调用
    if (!task.next(task.value).done) {  // 还记得吗，next方法返回的属性中 done属性的布尔值表示遍历是否结束
        task.value = task.next(task.value);
        scheduler(task);
    }
}
let steps = [step1Func, step2Func, step3Func];  // 接下来，利用for...of循环自动执行yield命令的特性,进行控制流管理
function* iterateSteps(steps) {   // 数组steps封装了一个任务的多个步骤，Generator函数iterateSteps则依次为这些步骤加上yield命令
    for (var i = 0; i < steps.length; i++) {
        var step = steps[i];
        yield step();
    }
}
// 将任务分解成步骤后，还可以将项目分解称多个依次执行的任务
let jobs = [job1, job2, job3];  //  数组jobs封装了一个项目的多个任务
function* iterateJobs(jobs) {    //  Generator函数iterateJobs依次为这些任务加上yield* 命令
    for (var i = 0; i < jobs.length; i++) {
        var job = jobs[i];
        yield* iterateSteps(job.steps);
    }
}
// 最后就可以用for...of一次性执行所有任务的所有步骤
for (var step of iterateJobs(jobs)) {
    console.log(step.id);
}


// (3) 部署Iterator接口
// 利用Generator函数，可以在任意对象上部署Iterator接口
function* iterEntries(obj) {
    let keys = Object.keys(obj);
    // console.log(`keys:${keys}`);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        // console.log(`key:${key}`);
        yield [key, obj[key]];  //  让yield返回一个键值对
    }
}
let myObj = { foo: 3, bar: 7 };
for (let [key, value] of iterEntries(myObj)) {
    console.log(key, value);
}
// foo 3
// bar 7
// 对数组部署Iterator接口(尽管数组原生具有这个接口)
function* makeSimpleGenerator(array) {
    var nextIndex = 0;
    while(newxtIndex<array.length) {
        yield array[nextIndex++];  // 生成 array[i++]
    }
}
var gen = makeSimpleGenerator(['yo','ya']);
gen.next().value  // 'yo'
gen.next().value  // 'ya'
gen.next().done   // true


// (4)作为数据结构
// Generator可以看作是是一个数组结构，因为Generator函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口
function *doStuff() {
    yield fs.readFile.bind(null, 'hello.txt');
    yield fs.readFile.bind(null, 'world.txt');
}
for(task of doStuff()) {}  // 使用了Generator函数后，可以像处理数组那样处理这两个返回的函数
