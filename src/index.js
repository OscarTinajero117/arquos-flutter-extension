const vscode = require("vscode");
const helloWorld = require("./commands/helloWorld");
const generateModule = require("./commands/generateModule");
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log(
    'Congratulations, your extension "arquos-flutter-extension" is now active!'
  );

  const commands = [
    vscode.commands.registerCommand(
      "arquos-flutter-extension.helloWorld",
      helloWorld
    ),
	vscode.commands.registerCommand(
		"arquos-flutter-extension.generateModule",
		generateModule
	  ),
  ];

  context.subscriptions.push(commands);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
