import { apiCall } from "./api.utils";
import { apiUrls } from "./apiUrls";

export const appService = {
    signup, login, sendOTPemail, verifyEmail
}

function verifyEmail (token) {
    return apiCall("POST", apiUrls.verify_email.base, token )
}
function sendOTPemail () {
    return apiCall("POST", apiUrls.send_email_otp.base )
}
function signup(requestBody) {
    return apiCall("POST", apiUrls.register.base, requestBody )
}
function login(requestBody) {
    return apiCall("POST", apiUrls.login.base, requestBody )
}