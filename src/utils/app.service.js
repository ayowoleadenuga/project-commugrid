import { apiCall } from "./api.utils";
import { apiUrls } from "./apiUrls";

export const appService = {
    signup, login, sendOTPemail, verifyEmail, forgotPassword
}

function verifyEmail (token) {
    return apiCall("POST", apiUrls.verify_email.base, token )
}
function sendOTPemail () {
    return apiCall("POST", apiUrls.send_email_otp.base )
}
function signup(requestBody, userType) {
    let url;
    if(userType === "merchant"){
       url = apiUrls.register.base2
    } else {
        url = apiUrls.register.base1
    }
    return apiCall("POST", url, requestBody )
}
function login(requestBody) {
    return apiCall("POST", apiUrls.login.base, requestBody )
}
function forgotPassword(requestBody) {
    return apiCall("POST", apiUrls.forgot_password.base, requestBody )
}