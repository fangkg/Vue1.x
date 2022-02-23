export default function Vue(options){
    this._init(options)
}

// 初始化配置对象
Vue.prototype._init = function(options){
    this.$options = options; // 将options配置挂载到Vue实例上
    initData(this); // 初始化options.data 代理data对象上的各个属性到Vue实例 给data对象上的各个属性设置响应式能力

    // 存在el配置项 调用$mount()编译模板
    if(this.$options.el){
        this.$mount();
    }
}

Vue.prototype.$mount = function() {
    mount(this);
}


