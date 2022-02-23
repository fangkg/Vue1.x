// 通过Observer类为对象设置响应式能立
export default function observe(value){
    // 避免无限递归 当value不是对象直接结束递归
    if(typeof value !== 'object') return
    // __ob__存在说明已经具有响应式能力 直接返回已有响应式对象
    if(value.__ob__) return value.__ob__;

    // 返回Observer实例
    return new Observer(value)
}