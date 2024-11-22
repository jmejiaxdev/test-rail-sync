import type { TestCaseDescription } from "../../shared/definitions/test-case.definitions";

export default function getDescriptions(fileContent: string): TestCaseDescription[] {
  let match;

  // const descriptionRegex = /test\(['"`](\d+)?\s*:?\s*(.*)['"`],/g;
  // const regex = /(?:test|it)\(\s*['"`]?(\d+)?(?::\s*)?(.*?)(?=['"`]\s*,\s*\(\s*=>)/s;
  const regex = /(?:test|it)\(['"`](\d+)?\s*:?\s*(.*)['"`],/g;
  const descriptions: TestCaseDescription[] = [];

  while ((match = regex.exec(fileContent)) !== null) {
    const id = match[1];
    const title = match[2].trim();
    descriptions.push({ id: parseInt(id), title });
  }

  console.log("getDescriptions descriptions", descriptions);
  return descriptions;
}
