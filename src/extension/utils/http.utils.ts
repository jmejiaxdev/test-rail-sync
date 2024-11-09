const getHeaders = (username?: string, password?: string): { "Authorization": string; "Content-Type": string } => {
  const encodedCredentials = btoa(`${username}:${password}`);

  return {
    "Authorization": `Basic ${encodedCredentials}`,
    "Content-Type": "application/json",
  };
};

const getBaseUrl = (organizationUrl?: string): string => {
  return `${organizationUrl}/api/v2/`;
};

const HttpUtils = {
  getHeaders,
  getBaseUrl,
};

export default HttpUtils;
