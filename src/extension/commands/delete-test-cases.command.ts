import type { ExtensionContext, Uri } from "vscode";
import { window } from "vscode";
import TestRailService from "../services/test-rail.service";
import CommandUtils from "../utils/command.utils";
import ErrorUtils from "../utils/error.utils";
import FileUtils from "../utils/file.utils";
import SettingsUtils from "../utils/settings.utils";

const command: Message["command"] = "delete-test-cases";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return async (uri: Uri): Promise<void> => {
    const userInput = await window.showInputBox({
      prompt: "Type 'delete all' to confirm.",
      // placeHolder: "Type 'delete all' to proceed",
      validateInput: (text) => {
        return text === "delete all" ? null : "Please type 'delete all' to confirm";
      },
    });

    if (userInput === "delete all") return;

    const panel = CommandUtils.createWebviewPanel(context, command, "Delete all test cases");

    const handleReceiveMessage = async (message: Message) => {
      try {
        const settings = SettingsUtils.getSettings(uri.fsPath);
        if (!settings) {
          throw ErrorUtils.createSettingsError();
        }

        const fileContent = FileUtils.getFileContent(uri.fsPath);
        const descriptions = FileUtils.extractTestCasesDescriptions(fileContent);
        const deleteDescriptions = descriptions.filter((description) => description.id);

        // Delete in TestRail
        const testCases = await TestRailService.deleteTestCases(settings.project, deleteDescriptions);
        panel.webview.postMessage({ ...message, data: testCases });

        // Update file content
        testCases.forEach((testCase) =>
          fileContent.replace(`${testCase.id}: ${testCase.description}`, testCase.title || ""),
        );
        FileUtils.saveFileContent(uri.fsPath, fileContent);

        window.showInformationMessage("Test cases deleted!");
      } catch (error) {
        ErrorUtils.showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const DeleteTestCasesCommand = { command: command, callback };

export default DeleteTestCasesCommand;
