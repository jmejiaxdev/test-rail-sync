import type { Settings } from "../../../shared/definitions/settings.definitions";
import type { TestCase } from "../../../shared/definitions/test-case.definitions";
import { TestRailApi } from "../../api";

export default async function getTestCase(settings: Settings, id: TestCase["id"]): Promise<TestCase> {
  return await TestRailApi.getTestCase(settings.project, id);
}
