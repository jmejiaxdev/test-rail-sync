import * as fs from "fs";
import * as path from "path";
import { SaveTestCaseResponse, TestCase, TestCaseDescription } from "../../shared/definitions/test-case.definitions";

const extractTestCasesDescriptions = (fileContent: string): TestCaseDescription[] => {
  console.log("Extracting test cases descriptions...");
  let match;

  const descriptionRegex = /test\(['"`](\d+)?\s*:?\s*(.*)['"`],/g;
  const descriptions: TestCaseDescription[] = [];

  while ((match = descriptionRegex.exec(fileContent)) !== null) {
    const id = match[1];
    const title = match[2].trim();
    descriptions.push({ id, title });
  }

  return descriptions;
};

const getSettingsFilePath = (startPath: string): string | null => {
  const fileName = ".testrailsync.config.json";
  let currentPath = startPath;

  while (currentPath !== path.parse(currentPath).root) {
    if (fs.existsSync(path.join(currentPath, fileName))) {
      const settingsFilePath = path.join(currentPath, fileName);
      console.log("Settings file found at", settingsFilePath);
      return settingsFilePath;
    }

    currentPath = path.dirname(currentPath);
  }

  return null;
};

const getFileContent = (filePath: string): string => {
  return fs.readFileSync(filePath, "utf8");
};

const saveFileContent = (filePath: string, content: string): void => {
  fs.writeFileSync(filePath, content, "utf8");
};

const updateTestFileContent = (testFilePath: string, testFileContent: string, testCases: SaveTestCaseResponse[]): string => {
  const toNewContent = (content: string, testCase: TestCase) =>
    content.replace(testCase?.title || "", `${testCase.id}: ${testCase.title}`);
  const newTestFileContent = testCases.filter((testCase) => testCase.isNew).reduce(toNewContent, testFileContent);
  saveFileContent(testFilePath, newTestFileContent);
};

const FileUtils = {
  extractTestCasesDescriptions,
  getFileContent,
  getSettingsFilePath,
  saveFileContent,
  updateTestFileContent,
};

export default FileUtils;
