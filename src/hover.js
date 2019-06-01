const vscode = require("vscode");
const path = require("path");

module.exports = function(context) {
    // 注册鼠标悬停提示
    console.log("注册鼠标悬停提示");
    console.log("注册鼠标悬停提示");
    console.log("注册鼠标悬停提示");
    context.subscriptions.push(
        vscode.languages.registerHoverProvider("js", {
            provideHover(document, position, token) {
                const fileName = document.fileName;
                const workDir = path.dirname(fileName);
                const word = document.getText(document.getWordRangeAtPosition(position));

                console.log(">>>>>>>>>>>>Hover:::", workDir);
                console.log(">>>>>>>>>>>>Hover:::", word);
                return new vscode.Hover(
                    `* **名称**：abc\n* **版本**：1.0.99\n* **许可协议**：hahaha`
                );
            }
        })
    );
};
