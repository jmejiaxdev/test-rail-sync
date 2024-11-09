import * as vscode from "vscode";
import TestRailService from "../services/test-rail.service";
import WebviewUtils from "../utils/webview.utils";
import SettingsUtils from "../utils/settings.utils";

// As defined in the package.json file contributes.commands section
const command: Message["command"] = "delete-test-cases";

const callback = (context: vscode.ExtensionContext) => async (uri: vscode.Uri) => {
  const userInput = await vscode.window.showInputBox({
    prompt: "Type 'delete' to confirm.",
    // placeHolder: 'Type "delete" to proceed',
    validateInput: (text) => {
      return text === "delete" ? null : "Please type 'delete' to confirm";
    },
  });

  if (userInput === "delete") {
    // TODO
    vscode.window.showInformationMessage("Action confirmed.");
  } else {
    vscode.window.showInformationMessage("Action canceled.");
  }
};

const DeleteSuitesCommand = { command, callback };

export default DeleteSuitesCommand;
