// 1. Defina a interface (o contrato do que deve existir)
export interface EnvironmentConfig {
  production: boolean;
  cognito: {
    userPoolId: string;
    userPoolClientId: string;
  };
}

// 2. Aplique a interface na constante
export const environment: EnvironmentConfig = {
  production: false,
  cognito: {
    userPoolId: 'us-east-2_hPTvLua8W',
    userPoolClientId: 'n66trc4mqlmknfp1gv666qvsc'
  }
};