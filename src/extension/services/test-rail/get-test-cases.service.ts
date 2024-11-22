import type { Settings } from "../../../shared/definitions/settings.definitions";
import type { TestCase } from "../../../shared/definitions/test-case.definitions";
import { TestRailApi } from "../../api";

export default async function getTestsCases(settings: Settings): Promise<TestCase[]> {
  return await TestRailApi.getTestCases(settings.project, settings.test_cases.section_id);
}
