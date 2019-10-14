import { authService } from "./authService";
import { history } from "../../../utils/history";
import { alertActions } from "../../../utils/Alert/actions/alert.actions";

export const CHANGE_DISABLE_STATUS = "CHANGE_DISABLE_STATUS";
export const CHANGE_CHECKED_VALUE = "CHANGE_CHECKED_VALUE";
export const authConstants = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOGIN_RESET: "LOGIN_RESET",
  
    LOGOUT: "LOGOUT"
  };

export function changeDisableStatus () {
    return {
        type: CHANGE_DISABLE_STATUS
    };
}

export function changeCheckedValue (value) {
    return {
        type: CHANGE_CHECKED_VALUE,
        payload: value
    }
}

export const authActions = {
    login,
    logout
  };
  
  function login(requestBody) {
    return async dispatch => {
      dispatch(request());
      try {
        const user = await authService.login(requestBody);
        if (user && user.token) {
          authService.setToken(user.token);
        }
        dispatch(success(user));
      } catch (error) {
        dispatch(failure(error));
        dispatch(alertActions.error(error || `${error[0].msg}${"at "}${error[0].param}`));
      }
    };
  
    function request() {
      return { type: authConstants.LOGIN_REQUEST };
    }
    function success(user) {
      history.push("/app");
      return { type: authConstants.LOGIN_SUCCESS, response: user };
    }
    function failure(error) {
      return { type: authConstants.LOGIN_FAILURE, error };
    }
  }
  
  function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT };
  }
  
