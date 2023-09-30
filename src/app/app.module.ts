import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RadioValidatorPipe } from './pipes/radio-validator.pipe';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { HomeComponent } from './components/home/home.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookComponent } from './components/book/book.component';
import { ViewBookDetailsComponent } from './components/view-book-details/view-book-details.component';

import { BookListComponent } from './components/book-list/book-list.component';
import { AddOrEditBookComponent } from './components/add-or-edit-book.component/add-or-edit-book.component';

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
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    RadioValidatorPipe,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    BookComponent,
    ViewBookDetailsComponent,
    AddOrEditBookComponent,
    BookListComponent,
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    {
      provide: "KEYCLOAK WITH PASSWORD GRANT TYPE",
      useFactory: initailizeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    {
      provide: "KEYCLOAK WITH AUTHORIZATION CODE GRANT TYPE",
      useFactory: initailizeKeyCloakGoogle,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
