import type { ExtensionContext, Uri } from "vscode";
import { window, Selection } from "vscode";
import type { Command, Message } from "../../shared/definitions/command.definitions";
import TestRailService from "../services/test-rail.service";
import CommandUtils from "../utils/command.utils";
import ErrorUtils from "../utils/error.utils";
import FileUtils from "../utils/file.utils";
import SettingsUtils from "../utils/settings.utils";

const command: Command = "get-test-case";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return (uri: Uri): void => {
    const editor = window.activeTextEditor;

    if (!editor) {
      throw new Error("VS Code editor not found");
    }

    const line = CommandUtils.getEditorLine(editor);
    const panel = CommandUtils.createWebviewPanel(context, command, "Get test case");

    const handleReceiveMessage = async (message: Message) => {
      try {
        const settings = SettingsUtils.getSettings(uri.fsPath);
        if (!settings) {
          throw ErrorUtils.createSettingsError();
        }

        const description = FileUtils.extractTestCasesDescriptions(line).pop();
        if (!description || !description.title) {
          throw new Error("Test case title not found");
        }

        if (!description.id) {
          throw new Error("Cannot get test case without an ID");
        }

        const testCase = await TestRailService.getTestCase(settings, description.id);
        panel.webview.postMessage({ ...message, data: testCase });
      } catch (error) {
        ErrorUtils.showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const GetTestCaseCommand = { command, callback };

export default GetTestCaseCommand;
