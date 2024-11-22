import type { ProjectSettings } from "../../../shared/definitions/settings.definitions";
import type { TestCase } from "../../../shared/definitions/test-case.definitions";
import { getApiClient } from "../../utils";

export default async function createTestCase(projectSettings: ProjectSettings, testCase: TestCase): Promise<TestCase> {
  console.log("createTestCase", { projectSettings, testCase });
  const apiClient = getApiClient(projectSettings);
  const response = await apiClient.post(`add_case/${testCase.section_id}`, testCase);
  return response.data as TestCase;
}
