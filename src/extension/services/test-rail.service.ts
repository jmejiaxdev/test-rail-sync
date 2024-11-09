import { ProjectSettings, Settings } from "../../shared/definitions/settings.definitions";
import { SaveTestCaseResponse, TestCase, TestCaseDescription } from "../../shared/definitions/test-case.definitions";
import TestRailApi from "../api/test-rail.api";
// import { SaveTestCases, TestCase, TestCaseDescription } from "../definitions/test-case.definitions";
// import ConsoleUtils from "../utils/console.utils";

// const deleteTestCases = async (testCaseDescritions: TestCaseDescription[]) => {
//   console.log("Deleting test cases in TestRail...");

//   for (const testCase of testCaseDescritions) {
//     await TestRailsApi.deleteTestCase(testCase.id);
//     ConsoleUtils.logTestCaseDescription("deleted", testCase);
//   }

//   if (testCaseDescritions.length) console.log(`${testCaseDescritions.length} test cases deleted in TestRail`);

//   return testCaseDescritions.length;
// };

const getSuites = async (projectSettings: ProjectSettings) => {
  console.log("Getting suites from TestRail...");
  return await TestRailApi.getSuites(projectSettings);
};

const getTestsCases = async (settings: Settings): Promise<TestCase[]> => {
  console.log("Getting test cases from TestRail...");
  return await TestRailApi.getTestsCases(settings.project, settings.test_cases.section_id);
};

// const markTestCasesAsDeleted = async (testCaseDescritions: TestCaseDescription[]) => {
//   for (const testCaseDescriptions of testCaseDescritions) {
//     await TestRailsApi.updateTestCase(testCaseDescriptions.id, { custom_status_id: CustomStatusId.MarkAsDeleted });
//     ConsoleUtils.logTestCaseDescription("markAsDeleted", testCaseDescriptions);
//   }

//   return testCaseDescritions.length;
// };

const saveTestCases = async (settings: Settings, descriptions: TestCaseDescription[]): Promise<SaveTestCaseResponse[]> => {
  console.log("Saving test cases in TestRail...");
  const testCases: SaveTestCaseResponse[] = [];

  for (const description of descriptions) {
    const testCase = { ...settings.test_cases, ...description };

    if (description.id) {
      const updatedTestCase = await TestRailApi.updateTestCase(settings.project, testCase);
      testCases.push({ ...updatedTestCase, isNew: false } as SaveTestCaseResponse);
    } else {
      const addedTestCase = await TestRailApi.addTestCase(settings.project, testCase);
      testCases.push({ ...addedTestCase, isNew: true } as SaveTestCaseResponse);
    }
  }

  return testCases;
};

const TestRailService = {
  // deleteTestCases,
  getSuites,
  getTestsCases,
  // markTestCasesAsDeleted,
  saveTestCases,
};

export default TestRailService;
