// for...in 遍历数组索引(index)
// for...of 遍历数组元素值(value)
const arr = ['a', 'b', 'c'];
for (let k in arr) {
    console.log(k)  // 0 1 2
}
for (let v of arr) {
    console.log(v)  // a b c
}

// for...in 更适合遍历对象  遍历数组会存在一些问题，比如index索引为字符串型数字，不能直接进行几何运算
let obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
    console.log(key);  // a b c
}

//  for..of 适用遍历 数/数组对象/字符串/map/set/arguments对象/DOM NodeList对象/Generator对象 等 拥有迭代器对象(iterator)的集合，但不能遍历对象(对象没有迭代器对象，用for...in遍历对象属性或内建的Object.keys)
for (let key of Object.keys(obj)) {
    console.log(key + ':' + obj[key]);
    /**
        a:1
        b:2
        c:3
     */
}

// for...in只能的获得对象的键名，for...of允许遍历获得键值
// 因此，for...in 总是得到对象的 key 或数组、字符串的下标； for...of 总是得到对象的 value 或数组、字符串的值