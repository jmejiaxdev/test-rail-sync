import type { ProjectSettings } from "../../../shared/definitions/settings.definitions";
import type { TestCase } from "../../../shared/definitions/test-case.definitions";
import { getApiClient } from "../../utils";

export default async function getTestCases(
  projectSettings: ProjectSettings,
  sectionId: TestCase["section_id"],
): Promise<TestCase[]> {
  console.log("getTestCases", { projectSettings, sectionId });
  const apiClient = getApiClient(projectSettings);
  const response = await apiClient.get(
    `get_cases/${projectSettings.project_id}&suite_id=${projectSettings.suite_id}&section_id=${sectionId}`,
  );
  return response.data.cases as TestCase[];
}
