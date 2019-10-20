const hostName = "https://commugrid-backend-staging.herokuapp.com";
const apiVersion = "api/v1";
// const nameSpaceConsumer = "consumer";
const baseUrl1 = `${hostName}/${"consumer"}/${apiVersion}`;
const baseUrl2 = `${hostName}/${"merchant"}/${apiVersion}`;

export const apiUrls = {
  register: {
    base1: `${baseUrl1}/register`,
    base2: `${baseUrl2}/register`,
  },
  login: {
    base: `${baseUrl1}/login`
  },
  change_password: {
    base: `${baseUrl1}/change-password`
  },
  forgot_password: {
    base: `${baseUrl1}/forgot-password`
  },
  send_email_otp: {
    base: `${baseUrl1}/send-email-verification`
  },
  verify_email: {
    base: `${baseUrl1}/verify-email`
  },
  reset_password: {
    base: `${baseUrl1}/reset-password`
  }
};
