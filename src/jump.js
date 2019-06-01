const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

function provideDefinition(document, position) {
    const fileName = document.fileName;
    const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));
    const line = document.lineAt(position);

    console.log("====== 进入 provideDefinition 方法 ======");
    console.log("fileName: " + fileName); // 当前文件名
    console.log("workDirworkDirworkDir: " + workDir); // 当前文件所在目录
    console.log("word: " + word); // 当前光标所在单词
    console.log("line: " + line.text); // 当前光标所在行

    if (/\/package\.json$/.test(fileName)) {
        console.log(word, line.text);
        const json = document.getText();
        // 这里我们偷懒只做一个简单的正则匹配
        if (
            new RegExp(
                `"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(
                    /\//g,
                    "\\/"
                )}[\\s\\S]*?\\}`,
                "gm"
            ).test(json)
        ) {
            let destPath = `${workDir}/node_modules/${word.replace(/"/g, "")}/README.md`;
            destPath =
                "/Users/aweleey/Public/codeleey/zzz-test.2/source/pages/train/common/watcher.js";
            console.log("[[[destPath]]]", destPath);
            if (fs.existsSync(destPath)) {
                // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
                console.log(
                    "\n\n\n\n>>>",
                    new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0))
                );
                return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
            }
        }
    }
}

module.exports = function(context) {
    // 注册如何实现跳转到定义，第一个参数表示仅对json文件生效
    context.subscriptions.push(
        vscode.languages.registerDefinitionProvider(
            [{ scheme: "file", pattern: "**/*.{js,jsx,ts,tsx,vue}" }],
            {
                provideDefinition(document, position) {
                    const fileName = document.fileName;
                    const workDir = path.dirname(fileName);
                    const word = document.getText(document.getWordRangeAtPosition(position));
                    const line = document.lineAt(position);

                    console.log("====== 进入 provideDefinition 方法 ======");
                    console.log("fileName: " + fileName); // 当前文件名
                    console.log("workDirworkDirworkDir: " + workDir); // 当前文件所在目录
                    console.log("word: " + word); // 当前光标所在单词
                    console.log("line: " + line.text); // 当前光标所在行

                    if (/\/package\.json$/.test(fileName)) {
                        console.log(word, line.text);
                        const json = document.getText();
                        // 这里我们偷懒只做一个简单的正则匹配
                        if (
                            new RegExp(
                                `"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(
                                    /\//g,
                                    "\\/"
                                )}[\\s\\S]*?\\}`,
                                "gm"
                            ).test(json)
                        ) {
                            let destPath = `${workDir}/node_modules/${word.replace(
                                /"/g,
                                ""
                            )}/README.md`;
                            destPath =
                                "/Users/aweleey/Public/codeleey/zzz-test.2/source/pages/train/common/watcher.js";
                            console.log("[[[destPath]]]", destPath);
                            if (fs.existsSync(destPath)) {
                                // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
                                console.log(
                                    "\n\n\n\n>>>",
                                    new vscode.Location(
                                        vscode.Uri.file(destPath),
                                        new vscode.Position(0, 0)
                                    )
                                );
                                return new vscode.Location(
                                    vscode.Uri.file(destPath),
                                    new vscode.Position(0, 0)
                                );
                            }
                        }
                    }
                }
            }
        )
    );
};
