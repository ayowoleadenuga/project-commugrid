import { appConstants } from "./app.constants";

const createUrlParams = params => {

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + "=" + esc(params[k]))
      .join("&");
  
    return query;
  };
  
  export const basicHeader = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };
  
  export const handleResponse = response => {
    if (response.ok && response.status === 200) {
      return response.json();
    } else if (response.ok && response.status === 201) {
      return response.text();
    }
  
    return response.json().then(json => {
      return Promise.reject(json.error);
    });
  };
  
  export const apiCall = (requestType, url, requestBody, requestParams) => {
    if (appConstants.getToken() !== null || appConstants.getToken() !== undefined ) {
        basicHeader["token"] = appConstants.getToken()
    }
    let headers = { ...basicHeader };
    const requestOptions = {
      method: requestType,
      headers,
      body: requestBody ? JSON.stringify(requestBody) : undefined
    };
    if (requestParams) {
     
      const urlParams = createUrlParams(requestParams);
      url = `${url}?${urlParams}`;
    }
    return fetch(url, requestOptions).then(handleResponse);
  };
  