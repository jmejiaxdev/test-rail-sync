import * as vscode from "vscode";
import WebviewUtils from "../utils/webview.utils";

// As defined in the package.json file contributes.commands section
const command: Message["command"] = "delete-test-cases";

const callback = (context: vscode.ExtensionContext) => {
  console.log(command);

  // return async (uri: vscode.Uri): Promise<void> => {
  //   const userInput = await vscode.window.showInputBox({
  //     prompt: "Type 'delete' to confirm.",
  //     // placeHolder: 'Type "delete" to proceed',
  //     validateInput: (text) => {
  //       return text === "delete" ? null : "Please type 'delete' to confirm";
  //     },
  //   });

  //   if (userInput === "delete") {
  //     const panel = WebviewUtils.createWebviewPanel(context, command, "Get test cases");
  //   } else {
  //     vscode.window.showInformationMessage("Action canceled.");
  //   }
  // };
};

const DeleteSuitesCommand = { command, callback };

export default DeleteSuitesCommand;
