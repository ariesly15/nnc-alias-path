const vscode = require("vscode");
const path = require("path");
const { getAlias } = require("./utils");
const fs = require("fs");
const config = require("./_config");

module.exports = function(context) {
    // 注册如何实现跳转到定义
    console.log("\n\n\n\n注册如何实现跳转到定义");
    context.subscriptions.push(
        vscode.languages.registerDefinitionProvider(
            [{ scheme: "file", pattern: "**/*.{js,jsx,ts,tsx,vue}" }],
            {
                provideDefinition(document, position) {
                    const fileName = document.fileName;
                    const alias = getAlias(fileName);
                    const line = document.lineAt(position).text;

                    Object.keys(alias).map(key => {
                        if (line.indexOf(key) >= 0) {
                            const pathReg = new RegExp(`${key}/(.+)[\'\"]`, "g");
                            const pathRest = pathReg.exec(line)[1];
                            let dist = path.join(config.projectDir, alias[key], pathRest);
                            if (!fs.existsSync(dist)) {
                                if (fs.existsSync(`${dist}/index.js`)) {
                                    dist = `${dist}/index.js`;
                                }
                                if (fs.existsSync(`${dist}.js`)) {
                                    dist = `${dist}.js`;
                                }
                            }
                            console.log("distdistdist", dist);
                            console.log("existsSync", fs.existsSync(dist));
                            return new vscode.Location(
                                vscode.Uri.file(dist),
                                new vscode.Range(0, 0, 0, 0)
                            );
                        }
                    });
                }
            }
        )
    );
};
