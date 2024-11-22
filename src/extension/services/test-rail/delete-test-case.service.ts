import type { ProjectSettings } from "../../../shared/definitions/settings.definitions";
import type { TestCase } from "../../../shared/definitions/test-case.definitions";
import { TestRailApi } from "../../api";

export default async function deleteTestCase(projectSettings: ProjectSettings, id: TestCase["id"]): Promise<TestCase> {
  return await TestRailApi.deleteTestCase(projectSettings, id);
}
