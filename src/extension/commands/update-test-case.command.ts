import type { ExtensionContext, Uri } from "vscode";
import { window } from "vscode";
import type { Command, Message } from "../../shared/definitions/command.definitions";
import TestRailService from "../services/test-rail.service";
import CommandUtils from "../utils/command.utils";
import ErrorUtils from "../utils/error.utils";
import FileUtils from "../utils/file.utils";
import SettingsUtils from "../utils/settings.utils";

const command: Command = "update-test-case";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return (uri: Uri): void => {
    const editor = window.activeTextEditor;

    if (!editor) {
      throw new Error("VS Code editor not found");
    }

    const line = CommandUtils.getEditorLine(editor);
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
          throw new Error("Cannot update test case without an ID");
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
