import observe from "./observe";
import Dep from "./Dep";

export default function defineReactive(target, key, val) {
  console.log('----------------')
  console.log(target)
  console.log('----------------')

  const ob = target.__ob__;
  
  if (arguments.length === 2) { // 如果参数数量只有2,
    val = target[key]; // 根据key 获取val
  }
  let childOb = observe(val)
  Object.defineProperty(target, key, { // 拦截处理每一个 key, val
    get() {
      console.log(`响应式 get 触发了 key=${key}`)
      console.log(val)
      
      if(Dep.target) {
          ob.dep.depend();
          if(childOb) {
              childOb.dep.depend();
          }
      }
      
      return val;
    },
    set(newValue) {
      console.log(`响应式 set 触发了 key=${key}`)
      console.log(newValue)
      if (newValue === val) {
        return;
      }
      val = newValue
      childOb = observe(val)
      
      ob.dep.notify()
      
    }
  })
  
}