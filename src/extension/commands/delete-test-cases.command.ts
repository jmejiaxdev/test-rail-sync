import type { ExtensionContext, Uri } from "vscode";
import { window } from "vscode";
import { TestRailService } from "../services";
import {
  createWebviewPanel,
  getSettings,
  getFile,
  createSettingsError,
  getDescriptions,
  removeIdsFromTestFile,
  showCommandError,
} from "../utils";
// FIXME
const command = "delete-test-cases";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return async (uri: Uri): Promise<void> => {
    const userInput = await window.showInputBox({
      prompt: "Type 'delete all' to confirm.",
      // placeHolder: "Type 'delete all' to proceed",
      validateInput: (text) => (text === "delete all" ? null : "Please type 'delete all' to confirm"),
    });
    if (userInput !== "delete all") return;

    const panel = createWebviewPanel(context, command, "Delete all test cases");

    const handleReceiveMessage = async () => {
      try {
        const settings = getSettings(uri.fsPath);
        if (!settings) throw createSettingsError();

        const fileContent = getFile(uri.fsPath);
        const descriptions = getDescriptions(fileContent);
        const deleteDescriptions = descriptions.filter((description) => description.id);

        await TestRailService.deleteTestCases(settings.project, deleteDescriptions);
        // panel.webview.postMessage({ ...message, data: testCases });
        removeIdsFromTestFile(uri.fsPath, deleteDescriptions);

        window.showInformationMessage("Test cases deleted!");
      } catch (error) {
        showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const DeleteTestCase = { command, callback };

export default DeleteTestCase;
