import type { ExtensionContext, Uri } from "vscode";
import { window } from "vscode";
import { TestRailService } from "../services";
import {
  createSettingsError,
  createWebviewPanel,
  getDescriptions,
  getFile,
  getSettings,
  appendIdsToTestFile,
  showCommandError,
} from "../utils";

const command = "create-test-cases";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return (uri: Uri): void => {
    const panel = createWebviewPanel(context, command, "Create all new test cases");

    const handleReceiveMessage = async (message: Message) => {
      try {
        const settings = getSettings(uri.fsPath);
        if (!settings) throw createSettingsError();

        const fileContent = getFile(uri.fsPath);
        const descriptions = getDescriptions(fileContent);
        const newDescriptions = descriptions.filter((description) => !description.id);
        if (!newDescriptions.length) throw new Error("Cannot find test cases to create");

        const testCases = await TestRailService.createTestCases(settings, newDescriptions);
        panel.webview.postMessage({ ...message, data: testCases });
        appendIdsToTestFile(uri.fsPath, testCases, fileContent);

        window.showInformationMessage("Test cases added!");
      } catch (error) {
        showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const CreateTestCases = { command, callback };

export default CreateTestCases;
