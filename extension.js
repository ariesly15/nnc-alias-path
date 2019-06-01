/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log("恭喜，您的扩展 “nnc-alias-path” 已被激活！");
    console.log("恭喜，您的扩展 “nnc-alias-path” 已被激活！");
    console.log("恭喜，您的扩展 “nnc-alias-path” 已被激活！");

    require("./src/hover")(context); // 悬停提示
    require("./src/alias")(context); // 跳转到定义
}

exports.activate = activate;

function deactivate() {
    console.log("您的扩展“vscode-plugin-demo”已被释放！");
}

module.exports = {
    activate,
    deactivate
};
