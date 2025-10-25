export const callApi = async (endpoint, method, body=null, retry=0) => {
  const API_BASE_URL = window.apiBaseUrl || 'http://localhost:3000';

  const credentials = 'include';
  const headers = method === 'GET' ? {} : {
    'Content-Type': 'application/json',
  };

  body = method === "GET"
    ? null
    : (
      body
        ? JSON.stringify(body)
        : undefined
    );
  
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    credentials,
    headers,
    body,
  };

  const resp = await fetch(url, options);

  if (resp.ok) return await resp.json();
  if (retry <= 0) return null;

  return await callApi(
    endpoint, method, body, retry - 1
  );
};

