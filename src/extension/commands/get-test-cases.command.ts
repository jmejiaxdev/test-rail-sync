import * as vscode from "vscode";
import TestRailService from "../services/test-rail.service";
import SettingsUtils from "../utils/settings.utils";
import WebviewUtils from "../utils/webview.utils";

// As defined in the package.json file contributes.commands section
const command: Message["command"] = "get-test-cases";

const callback =
  (context: vscode.ExtensionContext): Function =>
  (uri: vscode.Uri): void => {
    console.log("GetTestCasesCommand");
    const panel = vscode.window.createWebviewPanel(command, "Get test cases", vscode.ViewColumn.One, {
      enableScripts: true,
    });

    panel.webview.html = WebviewUtils.getWebviewHtml(command, panel, context.extensionPath);

    panel.webview.onDidReceiveMessage(async (message: Message) => {
      console.log("GetTestCasesCommand -> message", message);

      try {
        if (message.command !== command) return;

        const settings = SettingsUtils.getSettings(uri.fsPath);
        if (!settings) {
          return vscode.window.showInformationMessage(
            "'project' and 'test_cases.settings' required. Visit https://google.com to learn how to create your settings file.",
          );
        }

        const response = await TestRailService.getTestsCases(settings);
        panel.webview.postMessage({ ...message, data: response });
      } catch (error) {
        console.error("GetTestCasesCommand -> error", error);
      }
    });
  };

const GetTestCasesCommand = { command, callback };

export default GetTestCasesCommand;
