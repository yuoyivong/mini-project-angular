import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environment/environment';
import { Subject } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: environment.keycloak.issuer,
  strictDiscoveryDocumentValidation: false,
  redirectUri: environment.keycloak.redirectUri,
  clientId: environment.keycloak.clientId,
  scope : environment.keycloak.scope
};

export interface UserInfo {
  info: {
    sub : string,
    email: string,
    name: string,
    profile: string
  };
}

@Injectable({
  providedIn: 'root',
})

export class GoogleApiService {
  userProfileSubject = new Subject<UserInfo>();
  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oAuthConfig);
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow();
        } else {
          oAuthService.loadUserProfile().then((userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo);
            console.log(JSON.stringify(userProfile));
          });
        }
      });
    });
  }

  isLoggedInWithGoogle(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOutFromGoogle() {
    this.oAuthService.logOut();
  }
}
