import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Amplify } from 'aws-amplify';


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'SEU_USER_POOL_ID', // Ex: us-east-1_xxxxxxxxx
      userPoolClientId: 'SEU_APP_CLIENT_ID', // Ex: 3n4b5c6d7e8f9g0h1i2j3k4l5m
      loginWith: {
        email: true, // Ou username: true, dependendo da sua config
      }
    }
  }
});


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));