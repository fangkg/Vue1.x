import Dep from "./dep";

// cb回调函数负责更新DOM
export default function Watcher(cb){
    this._cb = cb;
    // 赋值
    Dep.target = this;
    // 执行cb cb函数中发生vm.xx属性读取 进行依赖收集
    cb();
    // 依赖收集完成Dep.target重新设置为null 防止重复收集
    Dep.target = null;
}


// 响应式数据更新时 dep通知watcher进行update()
Watcher.prototype.update = function(){
    this._cb();
}