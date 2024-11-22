import type { Settings } from "../../../shared/definitions/settings.definitions";
import type { TestCase, TestCaseDescription } from "../../../shared/definitions/test-case.definitions";
import { TestRailApi } from "../../api";

export default async function createTestCases(settings: Settings, descriptions: TestCaseDescription[]): Promise<TestCase[]> {
  const testCases: TestCase[] = [];

  for (const description of descriptions) {
    try {
      const testCase = await TestRailApi.createTestCase(settings.project, { ...settings.test_cases, ...description });
      testCases.push(testCase);
    } catch (error) {
      console.error("Error creating test case", { description, error });
    }
  }

  return testCases;
}
