export const environment = {
  production: false,
  keycloak: {
    issuer: 'http://localhost:9900/auth/realms/angular-project',
    redirectUri: 'http://localhost:4200/home',
    clientId: 'redo-mini-project-angular',
    scope: 'openid profile email',
    clientSecret: 'dyOaPhersjobmLUVT6fMLJUfDKXoB2AV',

  },
};
