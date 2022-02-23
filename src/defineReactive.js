import Dep from "./dep";
import observe from "./observe";

// 通过Object.defineProperty为obj.key设置getter setter拦截
export default function defineReactive(obj, key, val){
    // 递归调用observe 处理val为对象的情况
    const childOb = observe(val);
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        // 收集依赖
        get(){
            if(Dep.target){
                // 依赖收集
                dep.depend();
                // 存在子ob 一块完成依赖收集
                if(childOb){
                    childOb.dep.depend();
                }
            }
            return val
        },
        // 依赖通过watcher更新
        set(newVal){
            if(newVal === val) return
            val = newVal;
            // 对新值进行响应式处理 新值为非原始值
            observe(val);
            // 数据更新 让dep通知自己收集的所有watcher执行update()
            dep.notify()
        }
    })
}