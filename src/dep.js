export default function Dep(){
    // 存储当前dep实例收集的所有watcher
    this.watchers = []
}

Dep.target = null; // 静态属性 置为null或watcher实例 在实例化Watcher时进行赋值，收集完成重新赋值为null

// 收集watcher 发生读取操作时并且Dep.target不为null进行依赖收集
Dep.prototype.depend = function(){
    // 防止watcher实例被重复收集
    if(this.watchers.includes(Dep.target)) return
    // 收集watcher实例
    this.watchers.push(Dep.target);
}

// dep通知自己收集的所有watcher执行更新函数
Dep.prototype.notify = function(){
    for(let watcher of this.watchers){
        watcher.update()
    }
}