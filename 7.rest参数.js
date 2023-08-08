//  rest参数（...变量名） 用于获取函数的多余参数。这样就不需要使用arguments对象了。
//  rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中
function add(...values) {
    let sum = 0;
    for (var val of values) {
        sum += val;
    }
    return sum;
}
console.log(add(1, 2, 4));  // 利用rest参数，可以向该函数传入任意数目的参数

// 利用rest参数代替arguments变量的例子
const sortNumbers = (...numbers) => numbers.sort();
//  rest参数是一个真正的数组，数组特有的方法它都能使用

//  利用rest参数改写数组push方法的例子
function push(array, ...items) {
    items.forEach(function (item) {
        array.push(item);
        console.log(item);
    });
}
var a = [];
push(a, 1, 2, 3);

//  注意：rest参数之后不能有其他任何参数，否则报错
//  注意：函数的 length 方法，不包括rest参数
console.log((function (...a) { }).length);  // 0
