import jwt_decode from "jwt-decode";
import { appService } from "../../../utils/app.service";


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

const login = requestBody => {
  return appService.login(requestBody);
}
const forgotPassword = requestBody => {
  return appService.forgotPassword(requestBody);
}


export const authService = {
  login,
  logout,
  loggedIn,
  forgotPassword,
  getToken,
  setToken,
  tokenIsExpired
};
