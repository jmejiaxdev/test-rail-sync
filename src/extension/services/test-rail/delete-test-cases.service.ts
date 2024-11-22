import type { ProjectSettings } from "../../../shared/definitions/settings.definitions";
import type { TestCase, TestCaseDescription } from "../../../shared/definitions/test-case.definitions";
import { TestRailApi } from "../../api";

export default async function deleteTestCases(
  projectSettings: ProjectSettings,
  descriptions: TestCaseDescription[],
): Promise<TestCase[]> {
  const testCases: TestCase[] = [];

  for (const description of descriptions) {
    try {
      const testCase = await TestRailApi.deleteTestCase(projectSettings, description.id);
      testCases.push(testCase);
    } catch (error) {
      console.error("Error deleting test case", { description, error });
    }
  }

  return testCases;
}
