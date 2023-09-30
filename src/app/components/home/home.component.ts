import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'angular-oauth2-oidc';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  email: string | undefined;
  userInfor?: UserInfo;

  constructor(
    private _loginService: LoginService,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    console.log('Hello from home');

    this.activatedRoute.queryParamMap.subscribe((queries: any) => {
      console.log('Params : ', queries.params);

      if (queries.params.code) {
        console.log('what is this? ', queries.params.code);

        this.getAccessToken(queries.params.code).subscribe((data) => {
          console.log('token ', data);
          localStorage.setItem('token', data.access_token);
        });
      }
    });
    
  }

  ngOnInit() {
    if (!this._loginService.getIsLoggedIn()) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/book']);
      this.email = this._loginService.getEmail();
      console.log(this.email);
      console.log();
      
    }
    // this.activatedRoute.queryParams.subscribe((res) => {
    //   console.log(res['code']);
    //   if (res['code']) {
    //     this.getAccessToken(res['code']).subscribe((data) => {
    //       console.log('Data : ', data);
    //     });
    //   }
    // });
  }

  logout() {
    this._loginService.logout();
    this.router.navigate(['/']);
  }

  getAccessToken(code: string): Observable<any> {
    console.log('Code : ', code);

    const payload = new HttpParams()
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('redirect_uri', 'http://localhost:4200/home')
      .append('client_id', 'google-login-keycloak')
      .append('scope', 'openid')
      .append('client_secret', 'L2xHAcQWtlPmFcz06yzP2h6I7cmh7W0b');
    return this.http.post(
      'http://localhost:9900/auth/realms/angular-project/protocol/openid-connect/token',
      payload,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }

  // getDecodedAccessToken
}
