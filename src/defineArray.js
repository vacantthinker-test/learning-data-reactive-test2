import def from "./utils";

const arrayPrototype = Array.prototype // 获取Array原型
const arrayPrototypeNew = Object.create(arrayPrototype) // 创建一份Array原型, 以便修改它
const arrayMethods = ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'] // 7个方法
arrayMethods.forEach(method => {
  const originalMethod = arrayPrototype[method]
  def(arrayPrototypeNew, method, function () {
    console.log(`响应式 数组 执行了 method: ${method}`)
    const ob = this.__ob__;
    
    const args = [...arguments] // 转换一下
    const result = originalMethod.apply(this, arguments)
    let inserted = []
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    ob.walkArray(inserted)
    
    ob.dep.notify();
    
    return result;
  }, false)
})


export default function defineArray(arr) {
  Object.setPrototypeOf(arr, arrayPrototypeNew) // 拦截数组中的7个方法
}