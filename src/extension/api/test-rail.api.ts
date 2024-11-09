import axios from "axios";
import type { ProjectSettings } from "../../shared/definitions/settings.definitions";
import type { Suite } from "../../shared/definitions/suite.definitions";
import type { TestCase } from "../../shared/definitions/test-case.definitions";
import HttpUtils from "../utils/http.utils";

const addTestCase = async (projectSettings: ProjectSettings, testCase: TestCase): Promise<TestCase> => {
  console.log("Add test cases in TestRail...");
  const { api_key, organization_url, username } = projectSettings;

  const headers = HttpUtils.getHeaders(username, api_key);
  const baseUrl = HttpUtils.getBaseUrl(organization_url);

  const response = await axios.post(`${baseUrl}/add_case/${testCase.section_id}`, testCase, { headers });
  return response.data;
};

// const deleteTestCase = async (id: TestCase["id"]): Promise<TestCase> => {
//   const response = await api.post(`delete_case/${id}`);
//   return response.data;
// };

const getSuites = async (projectSettings: ProjectSettings): Promise<Suite[]> => {
  const { api_key, organization_url, project_id, username } = projectSettings;

  const headers = HttpUtils.getHeaders(username, api_key);
  console.log("headers", headers);
  const baseUrl = HttpUtils.getBaseUrl(organization_url);

  const response = await axios.get(`${baseUrl}get_suites/${project_id}`, { headers });
  console.log("response", response);
  return response.data as Suite[];
};

const getTestsCases = async (projectSettings: ProjectSettings, sectionId: TestCase["section_id"]): Promise<TestCase[]> => {
  const { api_key, organization_url, project_id, suite_id, username } = projectSettings;

  const headers = HttpUtils.getHeaders(username, api_key);
  const baseUrl = HttpUtils.getBaseUrl(organization_url);

  const response = await axios.get(`${baseUrl}get_cases/${project_id}&suite_id=${suite_id}&section_id=${sectionId}`, {
    headers,
  });
  console.log("response", response);
  return response.data.cases as TestCase[];
};

// const getTestCase = async (id: TestCase["id"]): Promise<TestCase> => {
//   const response = await api.get(`get_test/${id}`);
//   return response.data;
// };

const updateTestCase = async (projectSettings: ProjectSettings, testCase: TestCase): Promise<TestCase> => {
  const { api_key, organization_url, username } = projectSettings;

  const headers = HttpUtils.getHeaders(username, api_key);
  const baseUrl = HttpUtils.getBaseUrl(organization_url);

  const response = await axios.post(`${baseUrl}/update_case/${testCase.id}`, testCase, { headers });
  console.log("response", response);
  return response.data;
};

const TestRailApi = {
  addTestCase,
  // deleteTestCase,
  getSuites,
  getTestsCases,
  // getTestCase,
  updateTestCase,
};

export default TestRailApi;
