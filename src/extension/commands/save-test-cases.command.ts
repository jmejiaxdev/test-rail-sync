import * as vscode from "vscode";
import TestRailService from "../services/test-rail.service";
import ErrorUtils from "../utils/error.utils";
import FileUtils from "../utils/file.utils";
import SettingsUtils from "../utils/settings.utils";
import WebviewUtils from "../utils/webview.utils";

// As defined in the package.json file contributes.commands section
const command: Message["command"] = "save-test-cases";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: vscode.ExtensionContext): any => {
  console.log(command);

  return (uri: vscode.Uri): void => {
    const panel = WebviewUtils.createWebviewPanel(context, command, "Save test cases");

    const handleReceiveMessage = async (message: Message) => {
      try {
        const settings = SettingsUtils.getSettings(uri.fsPath);

        if (!settings) {
          throw ErrorUtils.createSettingsError("'project' and 'test_cases' settings required");
        }

        const testFileContent = FileUtils.getFileContent(uri.fsPath);
        const descriptions = FileUtils.extractTestCasesDescriptions(testFileContent);
        const testCases = await TestRailService.saveTestCases(settings, descriptions);
        panel.webview.postMessage({ ...message, data: testCases });

        FileUtils.updateTestFileContent(uri.fsPath, testFileContent, testCases);
      } catch (error) {
        // vscode.window.showErrorMessage(JSON.stringify(error));
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const GetTestCasesCommand = { command, callback };

export default GetTestCasesCommand;
