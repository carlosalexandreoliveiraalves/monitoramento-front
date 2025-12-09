import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_hPTvLua8W',
    // authWellknownEndpoints: {
    //   endSessionEndpoint: 'https://us-east-2hptvlua8w.auth.us-east-2.amazoncognito.com/logout'
    // },
    redirectUrl: window.location.origin,
    // postLogoutRedirectUri: window.location.origin,
    clientId: '4tnlsfrldrl6mg67fualvd123d',
    scope: 'openid profile email offline_access', // 'openid profile offline_access ' + your scopes
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
  }
}