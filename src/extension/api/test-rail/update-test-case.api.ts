import type { ProjectSettings } from "../../../shared/definitions/settings.definitions";
import type { TestCase } from "../../../shared/definitions/test-case.definitions";
import { getApiClient } from "../../utils";

export default async function updateTestCase(projectSettings: ProjectSettings, testCase: TestCase): Promise<TestCase> {
  console.log("updateTestCase", { projectSettings, testCase });
  const apiClient = getApiClient(projectSettings);
  const response = await apiClient.post(`update_case/${testCase.id}`, testCase);
  return response.data;
}
