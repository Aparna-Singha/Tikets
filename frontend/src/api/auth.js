import { callApi } from "@api/base";

export async function checkAuthStatus() {
  const { signedIn } = await callApi(
    "/auth/status", "GET"
  ) || { signedIn: false };

  return signedIn;
}

export async function getAuthCode(email) {
  const { code } = await callApi(
    `/auth/code/${email}`, "GET"
  ) || { code: [] };

  return code;
}

export async function cancelAuth() {
  await callApi("/auth/sign-out", "GET");
}

