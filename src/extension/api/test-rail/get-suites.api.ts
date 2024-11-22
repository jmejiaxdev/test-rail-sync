import type { ProjectSettings } from "../../../shared/definitions/settings.definitions";
import type { Suite } from "../../../shared/definitions/suite.definitions";
import { getApiClient } from "../../utils";

export default async function getSuites(projectSettings: ProjectSettings): Promise<Suite[]> {
  console.log("getSuites", { projectSettings });
  const apiClient = getApiClient(projectSettings);
  const response = await apiClient.get(`get_suites/${projectSettings.project_id}`);
  return response.data as Suite[];
}
