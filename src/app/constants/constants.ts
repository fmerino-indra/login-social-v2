export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:4200/oauth2/redirect'

export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorization/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorization/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorization/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;

/*
export const WSO2IS_AUTH_URL = API_BASE_URL + '/oauth2/authorize/wso2is?redirect_uri=' + OAUTH2_REDIRECT_URI;
*/

export const APP_MODEL_KEY = 'appModel';
export const FUNC_APP_MODEL_KEY = 'funcAppModel';

export const PROFILE_URI = API_BASE_URL + '/profile';

/* Funcionales */
export const REZO_URI = API_BASE_URL + '/rezo';
