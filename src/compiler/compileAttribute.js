import Watcher from "../watcher";

// 编译属性节点
export default function compileAttribute(node, vm){
    const attrs = Array.from(node.attributes);
    for(let attr of attrs){
        const {name, value} = attr;
        if(name.match(/v-on:click/)){
            compileVOnClick(node, value, vm);
        } else if(name.match(/v-bind:(.*)/)){
            compileVBind(node, value, vm);
        } else if(name.match(/v-model/)){
            compileVModel(node, value, vm);
        }
    }
}


function compileVOnClick(node, method, vm){
    node.addEventListener('click', function(...args){
        this.$options.methods[method].apply(vm, args)
    })
}

function compileVBind(node, attrValue, vm){
    // 属性名称
    const attrName = RegExp.$1;
    // 移除模板中v-bind属性
    node.removeAttribugte(`v-bind:${attrName}`)

    // 属性值发生变化 重新执行回调函数
    function cb(){
        node.setAttribute(attrName, vm[attrValue])
    }

    // 实例化Watcher 当属性值发生变化 dep通知watcher执行update() cb执行重新更新属性
    new Watcher(cb);
}

function compileVModel(node, key, vm){
    let {tagName, type} = node
    tagName = tagName.toLowerCase();
    if(tagName === 'input' && type === 'text'){
        node.value = vm[key];
        node.addEventListener('input', function() {
            vm[key] = node.value;
        })
    } else if(tagName === 'input' && type === 'checkbox'){
        node.checked = vm[key];
        node.addEventListener('change', function(){
            vm[key] = node.checked;
        })
    } else if(tagName === 'select'){
        node.value = vm[key];
        node.addEventListener('change', function() {
            vm[key] = node.value;
        })
    }
}