// 递归编译整棵节点树
export default function compileNode(nodes, vm){
    // 循环遍历当前节点的所有子节点
    for(let i = 0, len = nodes.length; i < len; i++){
        const node = nodes[i];
        // 元素节点
        if(node.nodeType === 1){
            // 编译元素上属性节点
            compileAttribute(node, vm);
            // 递归编译子节点
            compileNode(Array.from(node.childNodes), vm);
        } else if(node.nodeType === 3 && node.textContent.match(/{{(.*)}}/)){
            // 编译文本节点
            compileTextNode(node, vm);
        }
    }
}