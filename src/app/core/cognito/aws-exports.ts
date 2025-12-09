// ams-exporter.ts
import { ResourcesConfig } from 'aws-amplify';
import { environment } from '../../../environments/environment';

const awsmobile: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: environment.cognito.userPoolId,
      userPoolClientId: environment.cognito.userPoolClientId,
    }
  }
};

export default awsmobile;