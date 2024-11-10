import type { ExtensionContext, Uri } from "vscode";
import { window } from "vscode";
import TestRailService from "../services/test-rail.service";
import CommandUtils from "../utils/command.utils";
import ErrorUtils from "../utils/error.utils";
import FileUtils from "../utils/file.utils";
import SettingsUtils from "../utils/settings.utils";

const command: Message["command"] = "add-test-cases";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return (uri: Uri): void => {
    const panel = CommandUtils.createWebviewPanel(context, command, "Add all new test cases");

    const handleReceiveMessage = async (message: Message) => {
      try {
        const settings = SettingsUtils.getSettings(uri.fsPath);
        if (!settings) {
          throw ErrorUtils.createSettingsError();
        }

        const fileContent = FileUtils.getFileContent(uri.fsPath);
        const descriptions = FileUtils.extractTestCasesDescriptions(fileContent);
        const addDescriptions = descriptions.filter((description) => !description.id);

        if (!addDescriptions.length) {
          throw new Error("Cannot find test cases to add");
        }

        // Save in TestRail
        const testCases = await TestRailService.addTestCases(settings, addDescriptions);
        panel.webview.postMessage({ ...message, data: testCases });

        // Update file content
        testCases.forEach((testCase) => fileContent.replace(testCase.title || "", `${testCase.id}: ${testCase.title}`));
        FileUtils.saveFileContent(uri.fsPath, fileContent);

        window.showInformationMessage("Test cases added!");
      } catch (error) {
        ErrorUtils.showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const AddTestCasesCommand = { command, callback };

export default AddTestCasesCommand;
