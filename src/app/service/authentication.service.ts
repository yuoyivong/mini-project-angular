import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/response.model';
import { User } from '../models/user';
import { LoginResponse } from '../models/login-response';
import { env } from 'src/environment/env';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  userRegistration(user: User): Observable<any> {
    return this.http.post(`${env.apiUrl}/auth/register`, user);
  }

  userLogin(user: User): Observable<GenericResponse<LoginResponse>> {
    return this.http.post<GenericResponse<LoginResponse>>(`${env.apiUrl}/auth/login`, user);
  }

  // createNewUser(user : User) : Observable<any> {
  //   return this.http.post(`${this.BASE_URL}/`)
  // }
}
