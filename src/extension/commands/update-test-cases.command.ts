import type { ExtensionContext, Uri } from "vscode";
import { window } from "vscode";
import type { Command, Message } from "../../shared/definitions/command.definitions";
import TestRailService from "../services/test-rail.service";
import CommandUtils from "../utils/command.utils";
import ErrorUtils from "../utils/error.utils";
import FileUtils from "../utils/file.utils";
import SettingsUtils from "../utils/settings.utils";

const command: Command = "update-test-cases";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return (uri: Uri): void => {
    const panel = CommandUtils.createWebviewPanel(context, command, "Update test case");

    const handleReceiveMessage = async (message: Message): Promise<void> => {
      try {
        const settings = SettingsUtils.getSettings(uri.fsPath);
        if (!settings) throw ErrorUtils.createSettingsError();

        const fileContent = FileUtils.getFileContent(uri.fsPath);
        const descriptions = FileUtils.extractTestCasesDescriptions(fileContent);

        const updateDescriptions = descriptions.filter((description) => description.id);
        if (!updateDescriptions.length) throw new Error("Cannot find test cases to update");

        // Save in TestRail
        const testCases = await TestRailService.updateTestCases(settings, updateDescriptions);
        panel.webview.postMessage({ ...message, data: testCases });

        window.showInformationMessage("Test cases updated!");
      } catch (error) {
        ErrorUtils.showCommandError(error);
      }
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
  };
};

const UpdateTestCaseCommand = { command, callback };

export default UpdateTestCaseCommand;
