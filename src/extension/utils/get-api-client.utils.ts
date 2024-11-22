import type { AxiosInstance } from "axios";
import axios from "axios";
import type { ProjectSettings } from "../../shared/definitions/settings.definitions";

let api: AxiosInstance;

export default function getApiClient(projectSettings: ProjectSettings): AxiosInstance {
  const { api_key = "", organization_url, username = "" } = projectSettings;

  if (!api) {
    api = axios.create({
      baseURL: `${organization_url}/api/v2/`,
      headers: { "Content-Type": "application/json" },
      auth: { username, password: api_key },
    });
  }

  return api;
}
