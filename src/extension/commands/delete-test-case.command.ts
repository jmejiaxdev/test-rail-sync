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
  removeIdsFromTestFile,
} from "../utils";

const command = "delete-test-case";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return async (uri: Uri): Promise<void> => {
    const userInput = await window.showInputBox({
      prompt: "Type 'delete' to confirm.",
      // placeHolder: "Type 'delete all' to proceed",
      validateInput: (text) => (text === "delete" ? null : "Please type 'delete' to confirm"),
    });
    if (userInput !== "delete") return;

    const editor = window.activeTextEditor;
    if (!editor) throw new Error("VS Code editor not found");

    const line = getEditorLine(editor);
    const panel = createWebviewPanel(context, command, "Delete test case");

    const handleReceiveMessage = async () => {
      try {
        const settings = getSettings(uri.fsPath);
        if (!settings) throw createSettingsError();

        const descriptions = getDescriptions(line);
        const description = descriptions.pop();
        if (!description || !description.title || !description.id) throw new Error("Test case description not found");

        await TestRailService.deleteTestCase(settings.project, description.id);
        // panel.webview.postMessage({ ...message, data: [testCase] }); // postMessage expects an array
        removeIdsFromTestFile(uri.fsPath, [description]);

        window.showInformationMessage("Test case deleted!");
      } catch (error) {
        showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const DeleteTestCase = { command, callback };

export default DeleteTestCase;
