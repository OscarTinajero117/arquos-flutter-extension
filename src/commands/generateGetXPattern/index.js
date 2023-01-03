const vscode = require("vscode");
const fs = require("fs");
const mkdirp = require("mkdirp");

module.exports = async function (params) {
  // CHECK IF IS IN MODULES FOLDER
  const lastFolder = params.path.split("/").pop();
  if (lastFolder !== "lib") {
    vscode.window.showErrorMessage("Only works in lib folder");
    return;
  }
  // VALIDATE IF MODULE ALREADY EXISTS
  const dir = params.path + "/app";
  if (fs.existsSync(dir)) {
    const getResponse = await vscode.window.showInputBox({
      placeHolder: "y/N",
      prompt: "App Pattern already exists, do you want to overwrite it?",
    });
    if (
      getResponse === "y" ||
      getResponse === "Y" ||
      getResponse === "yes" ||
      getResponse === "Yes" ||
      getResponse === "YES"
    ) {
      fs.rmdirSync(dir, { recursive: true });
      _actionPattern(dir);
    } else {
      vscode.window.showWarningMessage("Operation canceled");
      return;
    }
  } else _actionPattern(dir);
  return;
};

const _actionPattern = (dir) => {
  try {
    _createDirectory(dir);
    vscode.window.showInformationMessage("App Pattern created successfully :D");
  } catch (error) {
    vscode.window.showErrorMessage("Error creating App Pattern: " + error);
  }
};

const _createDirectory = (dir) => {
  const directories = [
    `${dir}/data`,
    `${dir}/data/enums`,
    `${dir}/data/models`,
    `${dir}/data/providers`,
    `${dir}/data/repositories`,
    `${dir}/data/services`,
    `${dir}/modules`,
    `${dir}/widgets`,
    `${dir}/routes`,
    `${dir}/core`,
    `${dir}/core/errors`,
    `${dir}/core/values`,
    `${dir}/core/values/languages`,
    `${dir}/core/values/constants`,
    `${dir}/core/themes`,
    `${dir}/core/utils`,
    `${dir}/core/utils/api`,
    `${dir}/core/utils/db`,
    `${dir}/core/utils/helpers`,
    `${dir}/core/utils/isolates`,
  ];
  for (const directory of directories) {
    mkdirp.sync(directory);
  }
};
