// 编程实务中，如果读取对象内部的某个属性，往往需要判断一下该对象是否存在
const firstName = message?.body?.user?.firstName || 'default';
// 上面代码使用了 ?. 运算符，直接在链式调用的时候判断，左侧的对象是否为null或undefined，如果是就不再往下运算返回undefined

// 链判断运算符用法:
// (1)   obj?.prop  // 对象属性
// (2)   func?.(...args)  // 函数或对象方法的调用
// (3)   iterator.return?.() 

// 对于那些可能没有实现的方法，链判断运算符相当好用
if (myForm.checkValidity?.() === false) {
    // 表单校验失败
    return;
}
// 上面这个代码中，如果老式浏览器没有checkValidity方法，这时?.运算符就会返回undefined，判断语句就变成了undefined === false ，就会跳过下面的代码

a?.b  //  a == null ? undefined : a.b
a?.[b]  //  a == null ? undefined : a[x]
a?.b() //  a == null ? undefined : a.b()
a?.()  //  a == null ? undefined : a()

// 注意，链式判断符遵循【短路机制】，如果链式判断运算符一旦为true，右侧的表达式就不再求值
a?.[++x]  // a == null ? undefined : a[++x]  // a为undefined或null则不会执行x++

// 引入Null判断运算符 ?? ，一个目的是跟链判断运算符?.配合使用，【为null或undefined的值设置默认值】,代替 || 运算符指定默认值
const animationDuration = response.setting?.animationDuration ?? 300;  // 如果response.settings是null或undefined，就会返回默认值300
// 这个运算符很适合判断函数参数是否赋值
function Component(props) {
    const enable = props.enabled ?? true; // ??的行为类似||，但只有运算符左侧的值为null或undefined时，才会返回右侧的值
}
// 上面这个代码判断props参数的enabled属性是否赋值，如果没赋值就是没赋值就让 enabled=true

// ??优先级问题：如果??与 &&,|| 一起使用(多个逻辑运算符一起使用)，【必须用括号表明优先级】，否则报错
// lhs && middle ?? rhs  // 报错
(lhs && middle) ?? rhs // 不报错