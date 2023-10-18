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

export const firebase_env = {
  production: false,

  firebaseConfig: {
    apiKey: "AIzaSyAUjp3mvWzlrghWqkFL4-zGKJ_Ylx2LkD8",
    authDomain: "upload-file-angular-ad74b.firebaseapp.com",
    projectId: "upload-file-angular-ad74b",
    storageBucket: "upload-file-angular-ad74b.appspot.com",
    messagingSenderId: "597109153356",
    appId: "1:597109153356:web:cb8c4571389cb06c259ee9",
    measurementId: "G-REJBQB3QS1"
  },
};
