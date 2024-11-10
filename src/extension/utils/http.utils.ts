import type { AxiosInstance } from "axios";
import axios from "axios";
import type { ProjectSettings } from "../../shared/definitions/settings.definitions";

let api: AxiosInstance;

const getApiClient = (projectSettings: ProjectSettings): AxiosInstance => {
  const { api_key = "", organization_url, username = "" } = projectSettings;

  return (
    api ||
    axios.create({
      baseURL: `${organization_url}/api/v2/`,
      auth: { username, password: api_key },
      headers: { "Content-Type": "application/json" },
    })
  );
};

const HttpUtils = {
  getApiClient,
};

export default HttpUtils;
