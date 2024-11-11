export enum Template {
  "None" = 0,
  "Test Case" = 1,
}

export enum Type {
  "None" = 0,
  "Unit Test" = 7,
}

export enum Priority {
  "None" = 0,
  "Must Test" = 1,
}

export enum CustomStatusId {
  "None" = 0,
  "MarkAsDeleted" = 3,
}

export enum ManualVSAutomated {
  "None" = 0,
  "Automated" = 3,
}

export enum TypeAutomation {
  "None" = 0,
  "Unit Test" = 4,
}

export enum AutomationToolType {
  "None" = 0,
  "Jest" = 1,
}

export enum TestLevel {
  "None" = 0,
  "Unit Test" = 1,
}

export type TestCase = {
  // [key: string]: string | number | undefined;
  custom_automation_tool_type?: AutomationToolType;
  custom_manual_automated?: TypeAutomation;
  custom_manual_vs_automated?: ManualVSAutomated;
  custom_test_level?: TestLevel;
  id?: number;
  section_id?: number;
  status_id?: CustomStatusId;
  label?: string;
  priority_id?: Priority;
  refs?: string;
  template?: Template;
  title?: string;
  type_id?: Type;
};

export type TestCaseDescription = Pick<TestCase, "id" | "title">;
