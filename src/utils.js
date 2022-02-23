// 将key代理到target上
export function proxy(target, sourceKey, key){
    Object.defineProperty(target, key, {
        get(){
            return target[sourceKey][key];
        },
        set(newVal){
            target[sourceKey][key] = newVal;
        }
    })
}