import type { TestCase } from "./test-case.definitions";

export type Project = {
  [key: string]: string | number | TestCase | undefined;
  api_key?: string;
  organization_url?: string;
  project_id?: number;
  suite_id?: number; // AKA 'group_by'
  test_case?: TestCase;
  title?: string;
  username?: string;
};

export const DefaultProject: Project = {
  api_key: "",
  organization_url: "",
  project_id: 0,
  suite_id: 0,
  test_case: {
    custom_automation_tool_type: 0,
    custom_manual_automated: 0,
    custom_manual_vs_automated: 0,
    custom_test_level: 0,
    id: 0,
    label: "",
    priority_id: 0,
    refs: "",
    section_id: 0,
    template: 0,
    type_id: 0,
  },
  title: "",
  username: "",
};
