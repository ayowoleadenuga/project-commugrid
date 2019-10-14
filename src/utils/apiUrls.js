const hostName = "https://commugrid-backend-staging.herokuapp.com";
const apiVersion = "api/v1";
const nameSpace = "consumer";
const baseUrl = `${hostName}/${nameSpace}/${apiVersion}`;

export const apiUrls = {
  register: {
    base: `${baseUrl}/register`
  },
  login: {
    base: `${baseUrl}/login`
  },
  change_password: {
    base: `${baseUrl}/change-password`
  },
  send_email_otp: {
    base: `${baseUrl}/send-email-verification`
  },
  verify_email: {
    base: `${baseUrl}/verify-email`
  },
  reset_password: {
    base: `${baseUrl}/reset-password`
  }
};
