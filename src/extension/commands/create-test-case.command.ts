import type { ExtensionContext, Uri } from "vscode";
import { window } from "vscode";
import { TestRailService } from "../services";
import {
  getEditorLine,
  createWebviewPanel,
  getSettings,
  createSettingsError,
  showCommandError,
  getDescriptions,
  appendIdsToTestFile,
} from "../utils";

const command = "create-test-case";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return (uri: Uri): void => {
    const editor = window.activeTextEditor;
    if (!editor) throw new Error("VS Code editor not found");

    const line = getEditorLine(editor);
    const panel = createWebviewPanel(context, command, "Create new test case");

    const handleReceiveMessage = async (message: Message): Promise<void> => {
      try {
        const settings = getSettings(uri.fsPath);
        if (!settings) throw createSettingsError();

        const description = getDescriptions(line).pop();
        if (!description || !description.title || description.id) throw new Error("Test case description not found");

        const testCases = [await TestRailService.createTestCase(settings, description)]; // postMessage expects an array
        panel.webview.postMessage({ ...message, data: testCases });
        appendIdsToTestFile(uri.fsPath, testCases);

        window.showInformationMessage("Test case added!");
      } catch (error) {
        showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const CreateTestCase = { command, callback };

export default CreateTestCase;
