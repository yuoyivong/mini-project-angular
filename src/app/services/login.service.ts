import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  role: string = '';
  isLogin = false;

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    console.log('Email : ', email);
    console.log('Password : ', password);

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded;'
    );

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', email)
      .set('password', password)
      .set('client_id', 'redo-mini-project-angular')
      .set('client_secret', 'dyOaPhersjobmLUVT6fMLJUfDKXoB2AV');

    return this.http.post(
      'http://localhost:9900/auth/realms/angular-project/protocol/openid-connect/token',
      body,
      { headers: headers }
    );
  }

  public logout() {
    localStorage.clear();
  }

  public getIsLoggedIn(): boolean {
    const loggedIn = localStorage.getItem('token');
    if (loggedIn != null) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }

  public getEmail() {
    if (this.getIsLoggedIn()) {
      const token = localStorage!.getItem('token');
      const payload = token!.split('.')[1];
      const payloadDecodedJson = atob(payload);
      const paylaodDecoded = JSON.parse(payloadDecodedJson);
      console.log(paylaodDecoded);
      console.log(paylaodDecoded.roles[0].authority);
      localStorage.setItem('ROLE', paylaodDecoded.roles[0].authority);

      return paylaodDecoded.preferred_username ?? paylaodDecoded.sub;
    }
  }

  public getRole() {
    this.role = localStorage.getItem('ROLE')!;
    return this.role;
  }
}
