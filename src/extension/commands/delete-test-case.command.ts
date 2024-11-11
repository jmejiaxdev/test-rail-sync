import type { ExtensionContext, Uri } from "vscode";
import { window } from "vscode";
import type { Command, Message } from "../../shared/definitions/command.definitions";
import TestRailService from "../services/test-rail.service";
import CommandUtils from "../utils/command.utils";
import ErrorUtils from "../utils/error.utils";
import FileUtils from "../utils/file.utils";
import SettingsUtils from "../utils/settings.utils";

const command: Command = "delete-test-case";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return async (uri: Uri): Promise<void> => {
    const userInput = await window.showInputBox({
      prompt: "Type 'delete all' to confirm.",
      // placeHolder: "Type 'delete all' to proceed",
      validateInput: (text) => (text === "delete" ? null : "Please type 'delete' to confirm"),
    });
    if (userInput !== "delete") return;

    const editor = window.activeTextEditor;
    if (!editor) throw new Error("VS Code editor not found");

    const line = CommandUtils.getEditorLine(editor);
    const panel = CommandUtils.createWebviewPanel(context, command, "Delete test case");

    const handleReceiveMessage = async (message: Message) => {
      try {
        const settings = SettingsUtils.getSettings(uri.fsPath);
        if (!settings) throw ErrorUtils.createSettingsError();

        const description = FileUtils.extractTestCasesDescriptions(line).pop();
        if (!description || !description.title || !description.id) throw new Error("Test case description not found");

        // Delete in TestRail
        const testCase = await TestRailService.deleteTestCase(settings.project, description.id);
        panel.webview.postMessage({ ...message, data: testCase });

        // Update file content
        const fileContent = FileUtils.getFileContent(uri.fsPath);
        fileContent.replace(`${testCase.id}: ${testCase.title}`, `${testCase.title}`);
        FileUtils.saveFileContent(uri.fsPath, fileContent);

        window.showInformationMessage("Test case deleted!");
      } catch (error) {
        ErrorUtils.showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const DeleteTestCaseCommand = { command, callback };

export default DeleteTestCaseCommand;
