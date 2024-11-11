import type { ProjectSettings, Settings } from "../../shared/definitions/settings.definitions";
import type { Suite } from "../../shared/definitions/suite.definitions";
import type { TestCase, TestCaseDescription } from "../../shared/definitions/test-case.definitions";
import TestRailApi from "../api/test-rail.api";

const addTestCase = async (settings: Settings, description: TestCaseDescription): Promise<TestCase> => {
  const testCase = { ...settings.test_cases, ...description };
  return await TestRailApi.addTestCase(settings.project, testCase);
};

const addTestCases = async (settings: Settings, descriptions: TestCaseDescription[]): Promise<TestCase[]> => {
  const testCases: TestCase[] = [];

  for (const description of descriptions) {
    const testCase = await TestRailApi.addTestCase(settings.project, { ...settings.test_cases, ...description });
    testCases.push(testCase);
  }

  return testCases;
};

const deleteTestCase = async (projectSettings: ProjectSettings, id: TestCase["id"]): Promise<TestCase> =>
  await TestRailApi.deleteTestCase(projectSettings, id);

const deleteTestCases = async (
  projectSettings: ProjectSettings,
  descriptions: TestCaseDescription[],
): Promise<TestCase[]> => {
  const testCases: TestCase[] = [];

  for (const description of descriptions) {
    const testCase = await TestRailApi.deleteTestCase(projectSettings, description.id);
    testCases.push(testCase);
  }

  return testCases;
};

const getSuites = async (projectSettings: ProjectSettings): Promise<Suite[]> => await TestRailApi.getSuites(projectSettings);

const getTestCase = async (settings: Settings, id: TestCase["id"]): Promise<TestCase> =>
  await TestRailApi.getTestCase(settings.project, id);

const getTestsCases = async (settings: Settings): Promise<TestCase[]> =>
  await TestRailApi.getTestCases(settings.project, settings.test_cases.section_id);

const updateTestCase = async (settings: Settings, description: TestCaseDescription): Promise<TestCase> => {
  const testCase = { ...settings.test_cases, ...description };
  return await TestRailApi.updateTestCase(settings.project, testCase);
};

const updateTestCases = async (settings: Settings, descriptions: TestCaseDescription[]): Promise<TestCase[]> => {
  const testCases: TestCase[] = [];

  for (const description of descriptions) {
    const testCase = await TestRailApi.updateTestCase(settings.project, { ...settings.test_cases, ...description });
    testCases.push(testCase);
  }

  return testCases;
};

const TestRailService = {
  addTestCase,
  addTestCases,
  deleteTestCase,
  deleteTestCases,
  getSuites,
  getTestCase,
  getTestsCases,
  updateTestCase,
  updateTestCases,
};

export default TestRailService;
