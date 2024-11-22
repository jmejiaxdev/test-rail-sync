import type { ExtensionContext, Uri } from "vscode";
import { window } from "vscode";
import { TestRailService } from "../services";
import { createWebviewPanel, getSettings, createSettingsError, getFile, getDescriptions, showCommandError } from "../utils";

const command = "update-test-cases";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return (uri: Uri): void => {
    const panel = createWebviewPanel(context, command, "Update test case");

    const handleReceiveMessage = async (message: Message): Promise<void> => {
      try {
        const settings = getSettings(uri.fsPath);
        if (!settings) throw createSettingsError();

        const fileContent = getFile(uri.fsPath);
        const descriptions = getDescriptions(fileContent);

        const updateDescriptions = descriptions.filter((description) => description.id);
        if (!updateDescriptions.length) throw new Error("Cannot find test cases to update");

        // Save in TestRail
        const testCases = await TestRailService.updateTestCases(settings, updateDescriptions);
        panel.webview.postMessage({ ...message, data: testCases });

        window.showInformationMessage("Test cases updated!");
      } catch (error) {
        showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const UpdateTestCases = { command, callback };

export default UpdateTestCases;
