import * as vscode from "vscode";
import TestRailService from "../services/test-rail.service";
import ErrorUtils from "../utils/error.utils";
import SettingsUtils from "../utils/settings.utils";
import WebviewUtils from "../utils/webview.utils";

// As defined in the package.json file contributes.commands section
const command: Message["command"] = "get-suites";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: vscode.ExtensionContext): any => {
  console.log(command);

  return (uri: vscode.Uri): void => {
    const panel = WebviewUtils.createWebviewPanel(context, command, "Get suites");

    const handleReceiveMessage = async (message: Message) => {
      try {
        const settings = SettingsUtils.getSettings(uri.fsPath);
        if (!settings) {
          throw ErrorUtils.createSettingsError("'project' settings required");
        }

        const response = await TestRailService.getSuites(settings.project);
        panel.webview.postMessage({ ...message, data: response });
      } catch (error) {
        // vscode.window.showErrorMessage(JSON.stringify(error));
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const GetSuitesCommand = { command, callback };

export default GetSuitesCommand;
