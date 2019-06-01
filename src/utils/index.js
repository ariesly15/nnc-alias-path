const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const config = require("../_config");

function isDir(filePath) {
    return fs.existsSync(filePath) && fs.statSync(filePath).isDirectory();
}

function getAppJsonPath(filePath) {
    return path.join(filePath, "source", "app.json");
}

function existsAppJson(filePath) {
    return fs.existsSync(getAppJsonPath(filePath));
}

module.exports = {
    getAlias(fileName) {
        const vw = vscode.workspace;
        const vsConfig = vw.getConfiguration("nncAliasPath");
        const rootPath = vw.rootPath;
        if (vsConfig && vsConfig.isNNC) {
            if (existsAppJson(rootPath)) {
                config.projectDir = rootPath;
            } else {
                // mutil root dir
                config.projectDir = fs
                    .readdirSync(rootPath)
                    .map(item => path.join(rootPath, item))
                    .filter(
                        item => isDir(item) && existsAppJson(item) && fileName.includes(item)
                    )[0];
            }
            const appJson = JSON.parse(
                fs.readFileSync(getAppJsonPath(config.projectDir)).toString() || "{}"
            );
            return (appJson && appJson.alias) || {};
        }
        if (vsConfig && !vsConfig.isNNC) {
        }
    }
};
