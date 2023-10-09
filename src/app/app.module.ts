import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RadioValidatorPipe } from './pipes/radio-validator.pipe';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomePageModule } from './feature/home-page/home-page.module';
import { ServiceWorkerModule } from '@angular/service-worker';

function initailizeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:9900/auth',
        realm: 'angular-project',
        clientId: 'redo-mini-project-angular',
      },
      initOptions: {
        checkLoginIframe: false,
        onLoad: 'check-sso',
        // flow : 'implicit'
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/verificar-sso.html',
      },
      // enableBearerInterceptor : true,
      // bearerExcludedUrls : ['/assets', '/external-urls']
    });
}

function initailizeKeyCloakGoogle(keycloakGoogle: KeycloakService) {
  return () =>
    keycloakGoogle.init({
      config: {
        url: 'http://localhost:9900/auth',
        realm: 'angular-project',
        clientId: 'google-login-keycloak',
      },
      initOptions: {
        checkLoginIframe: false,
        onLoad: 'check-sso',
        flow: 'implicit',
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/verificar-sso.html',
      },
    });
}

@NgModule({
  declarations: [AppComponent, RadioValidatorPipe],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    HomePageModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: 'KEYCLOAK WITH PASSWORD GRANT TYPE',
      useFactory: initailizeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: 'KEYCLOAK WITH AUTHORIZATION CODE GRANT TYPE',
      useFactory: initailizeKeyCloakGoogle,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
