import jwt_decode from "jwt-decode";
import { apiCall } from "../../../utils/api.utils";
import { apiUrls } from "../../../utils/apiUrls";


const authLocalStorageKey = "id_token";

const setToken = idToken => {
  localStorage.setItem(authLocalStorageKey, idToken);
};

const getToken = () => {
  return localStorage.getItem(authLocalStorageKey);
};

const logout = () => {
  localStorage.removeItem(authLocalStorageKey);
  document.location.reload()
};

const tokenIsExpired = token => {
  try {
    const decodedToken = token ? jwt_decode(token) : null;
    return new Date(0).setUTCSeconds(decodedToken.exp) < new Date();
  } catch (e) {
    console.error(e);
    return true;
  }
};

const loggedIn = () => {
  const token = getToken();
  console.log(token)
  if (token) {
    return true;
  }
  return false;
};

// const getCustomerId = () => {
//   const token = getToken();
//   const userDetails = getUserDetails(token);
//   if (userDetails) {
//     console.log(userDetails.user_name)
//     return userDetails.user_name;
//   }

//   return null;
// };

function login(requestBody) {
  const method = "POST";
  return apiCall(method, apiUrls.login, requestBody);
}

export const authService = {
  login,
  logout,
  loggedIn,
  getToken,
  setToken,
//   getCustomerId,
//   getUserDetails,
  tokenIsExpired
};
