// 初始化options.data  代理data对象上的各个属性到Vue实例  给data对象上的各个属性设置响应式能力
export default function initData(vm){
    // 获取data选项
    let { data } = vm.$options;
    // 设置vm._data选项 保证它的值肯定是一个对象
    if(!data){
        vm._data = {};
    } else {
        vm._data = typeof data === 'function' ? data() : data;
    }

    // 代理， 将data对象上的各个属性代理到Vue实例上 支持通过this.xxx访问
    for(let key in vm._data){
        Proxy(vm, '_data', key)
    }

    // 设置响应式
    observe(vm._data)
}