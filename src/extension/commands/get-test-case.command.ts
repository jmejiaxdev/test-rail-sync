import type { ExtensionContext, Uri } from "vscode";
import TestRailService from "../services/test-rail.service";
import CommandUtils from "../utils/command.utils";
import ErrorUtils from "../utils/error.utils";
import SettingsUtils from "../utils/settings.utils";

const command: Message["command"] = "get-test-case";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return (uri: Uri): void => {
    const panel = CommandUtils.createWebviewPanel(context, command, "Get test cases");

    const handleReceiveMessage = async (message: Message) => {
      try {
        const settings = SettingsUtils.getSettings(uri.fsPath);
        if (!settings) {
          throw ErrorUtils.createSettingsError();
        }

        const response = await TestRailService.getTestsCases(settings);
        panel.webview.postMessage({ ...message, data: response });
      } catch (error) {
        ErrorUtils.showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const GetTestCaseCommand = { command, callback };

export default GetTestCaseCommand;