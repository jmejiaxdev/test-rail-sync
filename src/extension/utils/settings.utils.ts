import type { ProjectSettings, Settings, TestCasesSettings } from "../../shared/definitions/settings.definitions";
import FileUtils from "../utils/file.utils";

const isProjectSettings = (projectSettings: ProjectSettings): projectSettings is ProjectSettings => {
  const isProjectSettings = typeof projectSettings === "object" && projectSettings !== null;
  if (!isProjectSettings) {
    console.error("'project' is not an object");
    return false;
  }

  const isApiKey = typeof projectSettings.api_key === "string";
  if (!isApiKey) {
    console.error("'project.api_key' is not a string");
    return false;
  }

  const isOrganizationUrl = typeof projectSettings.organization_url === "string";
  if (!isOrganizationUrl) {
    console.error("'project.organization_url' url is not a string");
    return false;
  }

  const isProjectId = typeof projectSettings.project_id === "number";
  if (!isProjectId) {
    console.error("'project.project_id' is not a number");
    return false;
  }

  const isSuiteId = typeof projectSettings.suite_id === "number";
  if (!isSuiteId) {
    console.error("'project.suite_id' is not a number");
    return false;
  }

  const isUsername = typeof projectSettings.username === "string";
  if (!isUsername) {
    console.error("'project.username' is not a string");
    return false;
  }

  return isProjectSettings && isApiKey && isOrganizationUrl && isProjectId && isSuiteId && isUsername;
};

const isTestsCasesSettings = (testCasesSettings: TestCasesSettings): testCasesSettings is TestCasesSettings => {
  const isTestsCasesSettings = typeof testCasesSettings === "object" && testCasesSettings !== null;
  if (!isTestsCasesSettings) {
    console.error("'test_cases' is not an object");
    return false;
  }

  const isCustomAutomationToolType = typeof testCasesSettings.custom_automation_tool_type === "number";
  if (!isCustomAutomationToolType) {
    console.error("'test_cases.custom_automation_tool_type' is not a number");
    return false;
  }

  const isCustomManualAutomated = typeof testCasesSettings.custom_manual_automated === "number";
  if (!isCustomManualAutomated) {
    console.error("'test_cases.custom_manual_automated' is not a number");
    return false;
  }

  const isCustomManualVsAutomated = typeof testCasesSettings.custom_manual_vs_automated === "number";
  if (!isCustomManualVsAutomated) {
    console.error("'test_cases.custom_manual_vs_automated' is not a number");
    return false;
  }

  const isCustomTestLevel = typeof testCasesSettings.custom_test_level === "number";
  if (!isCustomTestLevel) {
    console.error("'test_cases.custom_test_level' is not a number");
    return false;
  }

  const isSectionId = typeof testCasesSettings.section_id === "number";
  if (!isSectionId) {
    console.error("'test_cases.section_id' is not a number");
    return false;
  }

  const isRefs = typeof testCasesSettings.refs === "string";
  if (!isRefs) {
    console.error("'test_cases.refs' is not a string");
    return false;
  }

  const isPriorityId = typeof testCasesSettings.priority_id === "number";
  if (!isPriorityId) {
    console.error("'test_cases.priority_id' is not a number");
    return false;
  }

  const isTemplate = typeof testCasesSettings.template === "number";
  if (!isTemplate) {
    console.error("'test_cases.template' is not a number");
    return false;
  }

  const isTypeId = typeof testCasesSettings.type_id === "number";
  if (!isTypeId) {
    console.error("'test_cases.type_id' is not a number");
    return false;
  }

  return (
    isTestsCasesSettings &&
    isCustomAutomationToolType &&
    isCustomManualAutomated &&
    isCustomManualVsAutomated &&
    isCustomTestLevel &&
    isRefs &&
    isPriorityId &&
    isTemplate &&
    isTypeId
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSettings = (settings: any): settings is Settings => {
  const isSettings = typeof settings === "object" && settings !== null;
  if (!isSettings) {
    console.error("Settings is not an object");
    return false;
  }

  return isProjectSettings(settings.project) && isTestsCasesSettings(settings.test_cases);
};

const getSettingsOverride = (fileContent: string): Settings | null => {
  const regex = /\/\*\*\s*TestRail Sync settings\s*([\s\S]*?)\*\//;

  const match = fileContent.match(regex);
  if (!match || !match[1]) {
    return null;
  }

  const jsonString = match[1]
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s*/, ""))
    .join("\n");

  return JSON.parse(jsonString) as Settings;
};

const getSettings = (filePath: string): Settings | null => {
  const settingsFilePath = FileUtils.getSettingsFilePath(filePath);
  if (!settingsFilePath) {
    console.error("Settings file path not found at", filePath);
    return null;
  }

  const settingsFileContent = settingsFilePath && FileUtils.getFileContent(settingsFilePath);
  if (!settingsFilePath) {
    console.error("Settings file empty", filePath);
    return null;
  }

  const settings = settingsFileContent && JSON.parse(settingsFileContent);
  if (!isSettings(settings)) {
    console.error("Settings file corrupt", settings);
    return null;
  }

  const settingsOverride = getSettingsOverride(filePath);
  if (settingsOverride) {
    settings.project = { ...settings.project, ...settingsOverride.project };
    settings.testCases = { ...settings.testCases, ...settingsOverride.testCases };
  }

  return settings;
};

const SettingsUtils = {
  getSettings,
};

export default SettingsUtils;
