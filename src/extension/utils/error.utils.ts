import { window } from "vscode";

const createSettingsError = (): Error => {
  return new Error(
    "'project' and 'test_cases' settings required. Visit https://github.com/jmejiaxdev/test-rail-sync# to learn how to create your settings file.",
  );
};

function showCommandError(error: unknown): void {
  window.showErrorMessage(error instanceof Error ? error.message : JSON.stringify(error));
}

const ErrorUtils = {
  createSettingsError,
  showCommandError,
};

export default ErrorUtils;
