import type { ExtensionContext, Uri } from "vscode";
import { TestRailService } from "../services";
import { createWebviewPanel, getSettings, createSettingsError, showCommandError } from "../utils";

const command = "get-test-cases";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return (uri: Uri): void => {
    const panel = createWebviewPanel(context, command, "Get test cases");

    const handleReceiveMessage = async (message: Message) => {
      try {
        const settings = getSettings(uri.fsPath);
        if (!settings) throw createSettingsError();

        const response = await TestRailService.getTestCases(settings);
        panel.webview.postMessage({ ...message, data: response });
      } catch (error) {
        showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const GetTestCase = { command, callback };

export default GetTestCase;
