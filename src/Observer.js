import Dep from "./dep";
import observe from "./observe";

// 为普通对象或数组设置响应式入口
export default function Observer(value){
    // 为对象本身设置一个dep 方便在更新对象本身时使用
    this.dep = new Dep();
    // 为对象设置__ob__属性 值为this  标识当前对象已经是响应式对象
    Object.defineProperty(value, '__ob__', {
        value: this,
        enumerable: false,
        writable: true,
        configurable: true
    })

    if(Array.isArray(value)){
        // 数组响应式
        protoArgument(value);
        this.observerArray(value);
    } else {
        // 对象响应式
        this.walk(value);
    }
}


// 遍历对象的每个属性 为属性设置getter setter拦截
Observer.prototype.walk = function(obj){
    for(let key in obj){
        defineReactive(obj, key, obj[key]);
    }
}

// 遍历数组的每个元素 为每个元素设置响应式
// 处理元素为对象的情况this.arr[idx].xx是响应式
Observer.prototype.observerArray = function(arr){
    for(let item of arr){
        observe(item);
    }
}