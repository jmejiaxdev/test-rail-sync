import { TestCase } from "./test-case.definitions";

export type ProjectSettings = {
  api_key?: string;
  organization_url?: string;
  project_id?: number;
  suite_id?: number;
  username?: string;
};

export type TestCasesSettings = Pick<
  TestCase,
  | "custom_automation_tool_type"
  | "custom_manual_automated"
  | "custom_manual_vs_automated"
  | "custom_test_level"
  | "section_id"
  | "refs"
  | "priority_id"
  | "template"
  | "type_id"
>;

export type Settings = {
  project: ProjectSettings;
  test_cases: TestCasesSettings;
};
