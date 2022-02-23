import Watcher from "../watcher";

// 编译文本节点
export default function compileTextNode(node, vm){
    const key = RegExp.$1.trim();
    // 当响应式数据key更新时 dep通知watcher执行update() cb()
    function cb(){
        node.textContext = JSON.stringify(vm[key]);
    }

    // 实例化Watcher 执行cb() 触发getter() 进行依赖收集
    new Watcher(cb);
}