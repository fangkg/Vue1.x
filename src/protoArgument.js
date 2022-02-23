// 拦截数组的七个方法实现

// 数组默认原型
const arrayProto = Array.prototype;
// 以默认数组原型对象为原型创建一个新的对象
const arrayMethods = Object.create(arrayProto);
// 拦截七个数组方法实现数组响应式 这七个方法能改变数组本身
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'splice',
    'sort'
];

methodsToPatch.forEach(method => {
    Object.defineProperty(arrayMethods, method, {
        value: function(...args){
            // 完成方法本职工作
            const ret = arrayProto[method].apply(this, args);
            // 实现响应式能力
            let inserted = [];
            switch(method){
                case 'push':
                case 'unshift':
                    inserted = args;
                    break;
                case 'splice':
                    inserted = args.slice(2);
                    break;
            }
            // 数组有新增元素 对新增元素响应式处理
            inserted.length && this.__ob__.observeArray(inserted);
            // 依赖通知更新
            this.__ob__.dep.notify();
            return ret;
        },
        configurable: true,
        writable: true,
        enumerable: true
    })
})

// 覆盖数组原型对象
export default function protoArgument(arr){
    arr.__proto__ = arrayMethods;
}