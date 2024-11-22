import type { Settings } from "../../../shared/definitions/settings.definitions";
import type { TestCase, TestCaseDescription } from "../../../shared/definitions/test-case.definitions";
import { TestRailApi } from "../../api";

export default async function createTestCase(settings: Settings, description: TestCaseDescription): Promise<TestCase> {
  const testCase = { ...settings.test_cases, ...description };
  return await TestRailApi.createTestCase(settings.project, testCase);
}
