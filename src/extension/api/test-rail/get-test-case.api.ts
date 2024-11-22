import type { ProjectSettings } from "../../../shared/definitions/settings.definitions";
import type { TestCase } from "../../../shared/definitions/test-case.definitions";
import { getApiClient } from "../../utils";

export default async function getTestCase(projectSettings: ProjectSettings, id: TestCase["id"]): Promise<TestCase> {
  console.log("getTestCase", { projectSettings, id });
  const apiClient = getApiClient(projectSettings);
  const response = await apiClient.get(`get_case/${id}`);
  return response.data as TestCase;
}
