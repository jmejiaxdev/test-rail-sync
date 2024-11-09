import * as vscode from "vscode";
import TestRailService from "../services/test-rail.service";
import FileUtils from "../utils/file.utils";
import SettingsUtils from "../utils/settings.utils";
import WebviewUtils from "../utils/webview.utils";

// As defined in the package.json file contributes.commands section
const command: Message["command"] = "save-test-cases";

const callback =
  (context: vscode.ExtensionContext): Function =>
  (uri: vscode.Uri): void => {
    console.log("SaveTestCases");
    const panel = vscode.window.createWebviewPanel(command, "Save test cases", vscode.ViewColumn.One, {
      enableScripts: true,
    });

    panel.webview.html = WebviewUtils.getWebviewHtml(command, panel, context.extensionPath);

    panel.webview.onDidReceiveMessage(async (message: Message) => {
      console.log("SaveTestCases -> message", message);

      try {
        if (message.command !== command) return;

        const settings = SettingsUtils.getSettings(uri.fsPath);
        if (!settings) {
          return vscode.window.showInformationMessage(
            "'project' and 'test_cases' settings required. Visit https://google.com to learn how to create your settings file.",
          );
        }

        const testFileContent = FileUtils.getFileContent(uri.fsPath);
        const descriptions = FileUtils.extractTestCasesDescriptions(testFileContent);
        const testCases = await TestRailService.saveTestCases(settings, descriptions);
        FileUtils.updateTestFileContent(uri.fsPath, testFileContent, testCases);
        panel.webview.postMessage({ ...message, data: testCases });
      } catch (error) {
        console.error("SaveTestCases -> error", error);
      }
    });
  };

const GetTestCasesCommand = { command, callback };

export default GetTestCasesCommand;
