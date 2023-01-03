const vscode = require("vscode");
const fs = require("fs");
module.exports = async function (params) {
  // ASK FOR MODULE NAME
  const getName = await vscode.window.showInputBox({
    placeHolder: "Insert Module name...",
  });

  // VALIDATE MODULE NAME
  if (!getName) {
    vscode.window.showWarningMessage("Module name is required");
    return;
  }
  const dirName = getName.replace(/\.?([A-Z])/g, (_, y) => `_${y.toLowerCase()}`).replace(/^_/, "");

  // VALIDATE IF MODULE ALREADY EXISTS
  const dir = params.path + "/" + dirName;

  if (fs.existsSync(dir)) {
    vscode.window.showWarningMessage("Module " + getName + " already exists");
    return;
  }
  try {
    // CREATE MODULE FOLDER
    fs.mkdirSync(dir);
    fs.mkdirSync(dir + "/widgets");

    // CREATE MODULE FILES
    fs.writeFileSync(dir + "/page.dart", _page(getName));
    fs.writeFileSync(dir + "/controller.dart", _controller(getName));
    fs.writeFileSync(dir + "/binding.dart", _binding(getName));

    // MESSAGE
    vscode.window.showInformationMessage(
      "Module " + getName + " created successfully :D"
    );
  } catch (error) {
    // MESSAGE ERROR
    vscode.window.showErrorMessage("Error creating module");
  }
  return;
};

const _page = (name) =>
  "import 'package:flutter/material.dart';\n" +
  "import 'package:get/get.dart';\n\n" +
  "import 'controller.dart';\n" +
  "class " +
  name +
  "Page extends GetView<" +
  name +
  "Controller> {\n" +
  "  const " +
  name +
  "Page({super.key});\n" +
  "" +
  "  @override\n" +
  "  Widget build(BuildContext context) {\n" +
  " // TODO: Implement " +
  name +
  "Page\n" +
  "    return Scaffold();\n" +
  "  }\n" +
  "}";

const _controller = (name) =>
  "import 'package:get/get.dart';\n\n" +
  "class " +
  name +
  "Controller extends GetxController {\n" +
  " // TODO: Implement " +
  name +
  "Controller\n" +
  "}";

const _binding = (name) =>
  "import 'package:get/get.dart';\n\n" +
  "import 'controller.dart';\n" +
  " // TODO: Implement " +
  name +
  "Bindings\n" +
  "class " +
  name +
  "Binding implements Bindings {\n" +
  "  @override\n" +
  "  void dependencies() {\n" +
  "    Get.lazyPut<" +
  name +
  "Controller>(\n" +
  "      () => " +
  name +
  "Controller(),\n" +
  "    );\n" +
  "  }\n" +
  "}";
