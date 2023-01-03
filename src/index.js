const vscode = require("vscode");
const generateModule = require("./commands/generateModule");
const generateGetXPattern = require("./commands/generateGetXPattern");
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log(
    'Congratulations, your extension "arquos-flutter-extension" is now active!'
  );

  const commands = [
    vscode.commands.registerCommand(
      "arquos-flutter-extension.generateModule",
      generateModule
    ),
    vscode.commands.registerCommand(
      "arquos-flutter-extension.generateGetXPattern",
      generateGetXPattern
    ),
  ];

  context.subscriptions.push(commands);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
