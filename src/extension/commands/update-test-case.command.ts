import type { ExtensionContext, Uri } from "vscode";
import { window } from "vscode";
import { TestRailService } from "../services";
import {
  getEditorLine,
  createWebviewPanel,
  getSettings,
  createSettingsError,
  getDescriptions,
  showCommandError,
} from "../utils";

const command = "update-test-case";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return (uri: Uri): void => {
    const editor = window.activeTextEditor;
    if (!editor) throw new Error("VS Code editor not found");

    const line = getEditorLine(editor);
    const panel = createWebviewPanel(context, command, "Update test case");

    const handleReceiveMessage = async (message: Message): Promise<void> => {
      try {
        const settings = getSettings(uri.fsPath);
        if (!settings) throw createSettingsError();

        const description = getDescriptions(line).pop();
        if (!description || !description.title || !description.id) throw new Error("Test case description not found");

        const testCase = await TestRailService.updateTestCase(settings, description);
        panel.webview.postMessage({ ...message, data: [testCase] });

        window.showInformationMessage("Test case updated!");
      } catch (error) {
        showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const UpdateTestCase = { command, callback };

export default UpdateTestCase;
