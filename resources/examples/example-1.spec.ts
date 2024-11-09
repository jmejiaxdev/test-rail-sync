// Add this to your test file to override your .testrailsync.config.json file
/**
 * TestRail Sync settings
 * {
 *   "project": {
 *     "api_key": "api_key",
 *     "organization_url": "https://example.testrail.com/index.php?",
 *     "project_id": 0,
 *     "suite_id": 0,
 *     "username": "user@example.com"
 *   },
 *   "test_cases": {
 *     "custom_automation_tool_type": 0,
 *     "custom_manual_automated": 0,
 *     "custom_manual_vs_automated": 0,
 *     "custom_test_level": 0,
 *     "refs": "refs",
 *     "priority_id": 0,
 *     "section_id": 0,
 *     "template": 0,
 *     "type_id": 0
 *   }
 * }
 */

export default function sum(a: number, b: number) {
  return a + b;
}

describe("sum function", () => {
  test("[Given] two positive numbers [When] they are added [Then] the result should be their sum", () => {
    expect(sum(2, 3)).toBe(5);
  });

  test("[Given] a positive number and zero [When] they are added [Then] the result should be the positive number", () => {
    expect(sum(5, 0)).toBe(5);
  });

  test("TEST [Given] two negative numbers [When] they are added [Then] the result should be their sum", () => {
    expect(sum(-2, -3)).toBe(-5);
  });
});
