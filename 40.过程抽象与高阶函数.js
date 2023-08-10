// function once(fn) {
//     // outer scope closure...  形成一个 闭包
//     return function (...args) {    //  每次调用foo()时调用这个函数
//         // inner scope
//         if (fn) {   // 第一次调用时会返回值，然后fn变为null，后续不再重复调用foo()
//             const ret = fn.apply(this, args);  //  第一次调用时fn与once内的函数行为等价
//             fn = null;
//             return ret;
//         }
//     }
// }
// // 这样就保证了once返回的方法只调用一次
// // 这就是一个非常典型的过程抽象，我们抽象了一个叫once的过程，它的参数是一个函数，它的作用是使得once函数内的任何函数至只调用一次

// const foo = once(() => {
//     console.log('bar');
// })
// foo();
// foo();
// foo();

// // 为了能够让“只执行一次”的需求【覆盖不同的事件处理】，我们可以将这个需求剥离出来，这个过程称为过程抽象
// function once(fn) {    //  高阶函数once
//     return function (...args) {
//         if (fn) {
//             const ret = fn.apply(this, args);
//             fn = null;
//             return ret;
//         }
//     }
// }

// // 高阶函数：参数为函数、返回值为函数、常用于作为函数装饰器
// function HOF0(fn) {   // 这是一个默认的等价高阶函数   等价高阶函数：return后面三行函数的任何行为 都与HOF0接收的fn参数行为一致   因此我们认为这个fn与HOF0等价
//     return function (...args) {
//         return fn.apply(this, args)
//     }
// }
// // 一般的高阶函数都在这个HOF0的基础上做了某些事情，比如改变了某些参数或返回值或添加规则


// // 常用高阶函数 HOF:
// // Once Throttle节流函数(鼠标或滚轮) Debounce Consumer/2 Iterative
// // THrottle节流
// function throttle(fn, time = 500) {
//     let timer;
//     return function (...args) {
//         if (timer == null) {   // 如果事件触发频率过高，由于timer还未到重新设置为null的时间，所以无法快速触发
//             fn.apply(this, args);
//             timer = setTimeout(() => {
//                 timer = null;
//             }, time);
//         }
//     }
// }
// btn.onclick = throttle(function (e) {
//     // ... 
// })

// // Debounce防抖
// function debounce(fn, dur) {
//     dur = dur || 100;
//     var timer;
//     return function () {
//         clearTimeout(timer);
//         timer = setTimeout(() => {   // 只会在某段时间的最后一次被调用
//             fn.apply(this, arguments);
//         }, dur);
//     }
// }
// document.addEventListener('xxx', debounce(function (e) {
//     // ...
// }, 100));

// // Consumer 每隔一段时间才会调用一次(延时调用)
function consumer(fn, time) {
    let tasks = [], timer;
    return function (...args) {
        tasks.push(fn.bind(this, ...args))
        if (timer == null) {
            timer = setInterval(() => {
                tasks.shift().call(this)
                if (tasks.length <= 0) {
                    clearInterval(timer);
                    timer = null
                }
            }, time);
        }
    }
}
function add(ref, x) {
    const v = ref.value + x;
    console.log(`${ref.value} + ${x} = ${v}`);
    ref.value = v;
    return ref;
}
let consumerAdd = consumer(add, 500);
const ref = { value: 0 };
for (let i = 0; i < 10; i++) {
    consumerAdd(ref, i);
}


// // 纯函数：输入和输出的都是确定的值，因此非常好测试  非纯函数越多，系统的可维护性越差
// // 使用高阶函数可以大大减少使用非纯函数的可能性，增加可维护性

// // 编程范式：命令式、声明式
// let list = [1, 2, 3, 4];
// // 命令式：
// let mapl = [];
// for (let i = 0; i < list.length; i++) {
//     mapl.push(list[i] * (2));
// }
// // 声明式：
// let double = (x) => { x * 2 };
// list.map(double);
// // js同时具有命令式和声明式的范式特点，map、forEach等为Array声明式编程提供便利
// // 声明式编程来控制一个开关
// function toggle(...actions) {
//     return function (...args) {
//         let action = actions.shift();
//         actions.push(action);
//         return action.apply(this, args);
//     }
// }
// switcher.onclick = toggle(
//     evt => evt.target.className = 'off',
//     evt => evt.target.className = 'on',
//     evt => evt.target.className = 'warn',
// )
// // 声明式编程在有大量类似样式的时候会显得简单，【可扩展性强】


// // 例：交通灯  异步+函数式
// const traffic = document.querySelector('#traffic');

// function wait(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }
// function setState(state) {
//     traffic.className = state;
// }
// async function start() {
//     while (1) {
//         setState('wait');
//         await wait(1000);
//         setState('stop');
//         await wait(3000);
//         setState('pass');
//         await wait(3000);
//     }
// }

// // 判断是不是4的幂
// function isPowerOfFour(num) {
//     num = parseInt(num);
//     return num > 0 &&
//         (num & (num - 1)) === 0 &&
//         (num & 0xAAAAAAAAAAAAA) === 0;
// }