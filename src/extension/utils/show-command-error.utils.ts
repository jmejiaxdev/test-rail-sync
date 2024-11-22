import { window } from "vscode";

export default function showCommandError(error: unknown): void {
  window.showErrorMessage(error instanceof Error ? error.message : JSON.stringify(error));
}
