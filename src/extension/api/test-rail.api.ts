import type { ProjectSettings } from "../../shared/definitions/settings.definitions";
import type { Suite } from "../../shared/definitions/suite.definitions";
import type { TestCase } from "../../shared/definitions/test-case.definitions";
import HttpUtils from "../utils/http.utils";

const addTestCase = async (projectSettings: ProjectSettings, testCase: TestCase): Promise<TestCase> => {
  const apiClient = HttpUtils.getApiClient(projectSettings);
  const response = await apiClient.post(`add_case/${testCase.section_id}`, testCase);
  return response.data as TestCase;
};

const deleteTestCase = async (projectSettings: ProjectSettings, id: TestCase["id"]): Promise<TestCase> => {
  const apiClient = HttpUtils.getApiClient(projectSettings);
  const response = await apiClient.post(`delete_case/${id}`);
  return response.data;
};

const getSuites = async (projectSettings: ProjectSettings): Promise<Suite[]> => {
  const apiClient = HttpUtils.getApiClient(projectSettings);
  const response = await apiClient.get(`get_suites/${projectSettings.project_id}`);
  return response.data as Suite[];
};

const getTestCases = async (projectSettings: ProjectSettings, sectionId: TestCase["section_id"]): Promise<TestCase[]> => {
  const apiClient = HttpUtils.getApiClient(projectSettings);
  const response = await apiClient.get(
    `get_cases/${projectSettings.project_id}&suite_id=${projectSettings.suite_id}&section_id=${sectionId}`,
  );
  return response.data.cases as TestCase[];
};

const getTestCase = async (projectSettings: ProjectSettings, id: TestCase["id"]): Promise<TestCase> => {
  const apiClient = HttpUtils.getApiClient(projectSettings);
  const response = await apiClient.get(`get_test/${id}`);
  return response.data as TestCase;
};

const updateTestCase = async (projectSettings: ProjectSettings, testCase: TestCase): Promise<TestCase> => {
  const apiClient = HttpUtils.getApiClient(projectSettings);
  const response = await apiClient.post(`update_case/${testCase.id}`, testCase);
  return response.data;
};

const TestRailApi = {
  addTestCase,
  deleteTestCase,
  getSuites,
  getTestCases,
  getTestCase,
  updateTestCase,
};

export default TestRailApi;
