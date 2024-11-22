import type { ExtensionContext, Uri } from "vscode";
import { TestRailService } from "../services";
import { createWebviewPanel, getSettings, createSettingsError, showCommandError } from "../utils";

// Kill this command?
const command = "get-suites";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callback = (context: ExtensionContext): any => {
  console.log(command);

  return (uri: Uri): void => {
    const panel = createWebviewPanel(context, command, "Get suites");

    const handleReceiveMessage = async (message: Message) => {
      try {
        const settings = getSettings(uri.fsPath);
        if (!settings) throw createSettingsError();

        const suites = await TestRailService.getSuites(settings.project);
        panel.webview.postMessage({ ...message, data: suites });
      } catch (error) {
        showCommandError(error);
      }

      console.log(`${command} handleReceiveMessage`);
    };

    panel.webview.onDidReceiveMessage(handleReceiveMessage);
    console.log(`${command} callback`);
  };
};

const GetSuites = { command, callback };

export default GetSuites;
