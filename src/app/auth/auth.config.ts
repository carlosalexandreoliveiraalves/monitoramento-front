import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_hPTvLua8W',
    redirectUrl: 'http://localhost:4200/home',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientId: '4tnlsfrldrl6mg67fualvd123d',
    scope: 'openid email phone',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
    autoUserInfo: false,
    silentRenewUrl: 'http://localhost:4200/silent-renew.html',
  }
}