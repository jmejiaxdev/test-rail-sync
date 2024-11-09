import * as vscode from "vscode";
import TestRailService from "../services/test-rail.service";
import WebviewUtils from "../utils/webview.utils";
import SettingsUtils from "../utils/settings.utils";

// As defined in the package.json file contributes.commands section
const command: Message["command"] = "get-suites";

const callback = (context: vscode.ExtensionContext) => (uri: vscode.Uri) => {
  console.log("GetSuitesCommand");
  const panel = vscode.window.createWebviewPanel(command, "Get suites", vscode.ViewColumn.One, { enableScripts: true });

  panel.webview.html = WebviewUtils.getWebviewHtml(command, panel, context.extensionPath);

  panel.webview.onDidReceiveMessage(async (message: Message) => {
    console.log("GetSuitesCommand -> message", message);

    try {
      if (message.command !== command) return;

      const settings = SettingsUtils.getSettings(uri.fsPath);
      if (!settings) {
        return vscode.window.showInformationMessage(
          "'project' settings required. Visit https://google.com to learn how to create your settings file.",
        );
      }

      const response = await TestRailService.getSuites(settings.project);
      panel.webview.postMessage({ ...message, data: response });
    } catch (error) {
      console.error("GetSuitesCommand -> error", error);
    }
  });
};

const GetSuitesCommand = { command, callback };

export default GetSuitesCommand;
