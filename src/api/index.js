import axios from "axios";
import { typeCheck } from "../generalComponents/generalHelpers";
import { TYPES } from "../generalComponents/globalVariables";

const api = axios.create({
  withCredentials: false
});

api.defaults.withCredentials = false;

export default api;

export const cancelRequest = async (keyName) => {
  if (typeof window === "undefined") return;
  if (typeof window.cancellationTokens === "undefined") return;
  const cancelMethod = window.cancellationTokens[keyName];
  if (!cancelMethod) return;
  await new Promise((resolve) => resolve(cancelMethod.cancel())).then(() => {
    delete window.cancellationTokens[keyName];
    return true;
  });
};

const CancelToken = axios.CancelToken;

export function createCancelToken(tokenName) {
  const cancelRequest = CancelToken.source();
  if (typeCheck(window.cancellationTokens) === TYPES.UNDEFINED) {
    window.cancellationTokens = { [tokenName]: cancelRequest };
  } else {
    window.cancellationTokens = { ...window.cancellationTokens, [tokenName]: cancelRequest };
  }
  return cancelRequest;
}

export function deleteCancelToken(tokenName) {
  delete window.cancellationTokens[tokenName];
}
