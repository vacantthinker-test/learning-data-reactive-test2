import Dep from "./Dep";

let uid = 0
export default class Watcher {
  constructor(target, expression, callback) {
    this.id = uid++;
    this.target = target;
    this.getter = parsePath(expression)
    this.callback = callback
    this.originalValue = this.get()
  }
  
  update() {
    console.log('watcher: update 执行了')
    let newValue = this.get();
    let oldValue = this.originalValue;
    
    if (newValue !== oldValue) {
      this.originalValue = newValue; // 更新 新值
      
      this.callback.call(this.target, newValue, oldValue) // 执行 监视 的 函数withData()
    }
  }
  
  get() {
    Dep.target = this;
    const obj = this.target;
    let value = null;
    try {
      value = this.getter(obj)
    } catch (e) {
      console.log(e)
    } finally {
      Dep.target = null;
    }
    console.log(value)
    return value;
  }
}

function parsePath(expression) {
  let segments = expression.split('.');
  return function getValueByKey(obj) {
    for (let i = 0; i < segments.length; i++) {
      let item = segments[i];
      obj = obj[item]
    }
    return obj;
  };
}