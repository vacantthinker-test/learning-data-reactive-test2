import def from "./utils";
import defineReactive from "./defineReactive";
import observe from "./observe";
import defineArray from "./defineArray";
import Dep from "./Dep";

export default class Observer {
  constructor(value) {
    this.dep = new Dep()
    def(value, '__ob__', this, false);
    
    if (Array.isArray(value)) {
      defineArray(value)
      this.walkArray(value)
    } else {
      this.walk(value);
    }
    
  }
  
  walk(obj) { // 针对对象中每一项 进行响应式处理
    for (let key in obj) {
      defineReactive(obj, key)
    }
  }
  
  walkArray(arr) { // 针对数组中的每一项 进行响应式处理
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i]
      observe(item)
    }
  }
}