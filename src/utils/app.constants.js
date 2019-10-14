const setToken = idToken => {
    localStorage.setItem(authLocalStorageKey, idToken);
  };

const authLocalStorageKey = "token";

const getToken = () => {
    return localStorage.getItem(authLocalStorageKey);
};
const logout = () => {
    localStorage.removeItem(authLocalStorageKey);
  };
export const appConstants = {
    setToken, logout, getToken
}