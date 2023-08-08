// Proxy 修改某些操作的默认行为 即对编程语言进行编程 Proxy(代理器)

// 可以理解为在目标对象之前架设一层“拦截”，可以对外界的访问进行过滤和改写
// var proxy = new Proxy(target,handler);
// 生成一个Proxy实例，target参数表示要拦截的目标对象，handler参数是用来定制拦截行为的对象

var proxy = new Proxy({}, {
    get: function (target, propKey) {  // get方法用来拦截对目标对象属性的访问请求 参数分别是目标对象和所要访问的属性
        return 10;  // 拦截函数返回10，所以访问任何属性都得到10
    }
})
proxy.zzzz   // 10
// 注意，要使得proxy起作用，必须针对Proxy实例进行操作，而不是对目标对象(上例是空对象)进行操作

// 一个技巧是将Proxy对象设置到object.proxy属性，从而可以在object对象上调用
var object = {
    proxy: new Proxy(target, handler)
};
// Proxy实例也可以作为其他对象的原型对象
let obj = Object.create(proxy);
obj.aaa  // 10   proxy对象是obj对象的原型，obj对象本身没有aaa属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截

// 同一个拦截器函数，可以设置拦截多个操作
/*
下面是 Proxy 支持的拦截操作一览，一共 13 种。

get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
*/


// Proxy对象可以拦截目标对象的任意属性，使得它很适合用来写Web服务的客户端
const service = createWebService('http://example.com/data');

service.employees().then(json => {
    const employees = JSON.parse(json);
    // ...
});
// 上面代码新键一个Web服务接口，这个接口返回各种数据，Proxy可以拦截这个对象的任意属性，所以不用为每个数据写一个适配方法，只要写一个Proxy拦截就行
function createWebService(baseUrl) {
    return new Proxy({}, {
        get(target, propKey, receiver) {
            return () => httpGet(baseUrl + '/' + propKey);
        }
    });
}