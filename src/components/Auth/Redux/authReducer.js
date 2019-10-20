import { CHANGE_CHECKED_VALUE, CHANGE_DISABLE_STATUS, authConstants, RESET_FORM } from "./authActions";

const initialState = {
    checkedValue: '',
    disable: true,
    submitting: false,
    submitted: false,
    response: null,
    request: null,
    forgotPasswordStatus: null,
    error: null
}

export default function( state = initialState, action ) {
    switch (action.type) {
        case CHANGE_CHECKED_VALUE:
            return { ...state, checkedValue: action.payload };
        case CHANGE_DISABLE_STATUS:
            return { ...state, disable: !state.disable };
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                submitting: true,
                submitted: false,
                request: action.requestBody,
                response: null,
                error: null
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                submitting: false,
                submitted: true,
                response: action.response,
                error: null
            };
        case RESET_FORM:
            return {
                ...state,
                error: null
            };
        case authConstants.LOGIN_FAILURE:
            return {
                ...state,
                submitting: false,
                submitted: false,
                response: null,
                error: action.error
            };
        case authConstants.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordStatus: true
            };
        case authConstants.LOGIN_RESET:
            return {
                ...state,
                ...initialState
            };
        case authConstants.LOGOUT:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
}