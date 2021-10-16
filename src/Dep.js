let uid = 0
export default class Dep {
  static target;
  
  constructor() {
    this.id = uid++;
    this.subs = new Set()
  }
  
  addSub(sub) {
    this.subs.add(sub)
  }
  
  depend() {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  
  notify() {
    let setNew = new Set(this.subs)
    setNew.forEach(sub => sub.update())
  }
}