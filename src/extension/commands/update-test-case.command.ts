import type { ExtensionContext, Uri } from "vscode";
import { window } from "vscode";
import TestRailService from "../services/test-rail.service";
import CommandUtils from "../utils/command.utils";
import ErrorUtils from "../utils/error.utils";
import FileUtils from "../utils/file.utils";
import SettingsUtils from "../utils/settings.utils";

const command: Message["command"] = "update-test-case";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  const editor = window.activeTextEditor;

  if (!editor) {
    throw new Error("VS Code editor not found");
  }

  const line = CommandUtils.getEditorLine(editor);

  return (uri: Uri): void => {
    const panel = CommandUtils.createWebviewPanel(context, command, "Update test case");

    const handleReceiveMessage = async (message: Message): Promise<void> => {
      try {
        const settings = SettingsUtils.getSettings(uri.fsPath);
        if (!settings) {
          throw ErrorUtils.createSettingsError();
        }

        const description = FileUtils.extractTestCasesDescriptions(line).pop();
        if (!description || !description.title) {
          throw new Error("Test case title not found");
        }

        if (description.id) {
          throw new Error("Cannot update test case with an ID");
        }

        // Save in TestRail
        const testCase = await TestRailService.updateTestCase(settings, description);
        panel.webview.postMessage({ ...message, data: testCase });

        window.showInformationMessage("Test case updated!");
      } catch (error) {
        ErrorUtils.showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const AddTestCaseCommand = { command, callback };

export default AddTestCaseCommand;
