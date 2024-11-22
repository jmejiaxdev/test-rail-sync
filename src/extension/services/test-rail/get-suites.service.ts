import type { ProjectSettings } from "../../../shared/definitions/settings.definitions";
import type { Suite } from "../../../shared/definitions/suite.definitions";
import { TestRailApi } from "../../api";

export default async function getSuites(projectSettings: ProjectSettings): Promise<Suite[]> {
  return await TestRailApi.getSuites(projectSettings);
}
