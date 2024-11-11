import type { TestCase } from "../../shared/definitions/test-case.definitions";
import {
  AutomationToolType,
  CustomStatusId,
  ManualVSAutomated,
  Priority,
  Template,
  TestLevel,
  Type,
  TypeAutomation,
} from "../../shared/definitions/test-case.definitions";

const toFormattedTestCase = (testCases: TestCase[]): unknown =>
  testCases.map((testCase) => ({
    ...testCase,
    custom_automation_tool_type: AutomationToolType[testCase.custom_automation_tool_type || 0],
    custom_manual_automated: TypeAutomation[testCase.custom_manual_automated || 0],
    custom_manual_vs_automated: ManualVSAutomated[testCase.custom_manual_vs_automated || 0],
    custom_test_level: TestLevel[testCase.custom_test_level || 0],
    status_id: CustomStatusId[testCase.status_id || 0],
    priority_id: Priority[testCase.priority_id || 0],
    template: Template[testCase.template || 0],
    type_id: Type[testCase.type_id || 0],
  }));

const TestCaseUtils = {
  toFormattedTestCase,
};

export default TestCaseUtils;
