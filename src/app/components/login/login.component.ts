import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public isLogin = false;
  public profileUser: KeycloakProfile | null = null;

  constructor(
    private router: Router,
    private readonly keycloak: KeycloakService,
    private _loginService: LoginService
  ) {}

  loginForm!: FormGroup;
  error: boolean = false;

  public async ngOnInit() {
    this.submitLogin();
    this.isLogin = await this.keycloak.isLoggedIn();

    type roleUser = Array<{ id: number; text: string }>;

    if (this.isLogin) {
      this.profileUser = await this.keycloak.loadUserProfile();
    }
  }

  logIn() {
    this._loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (res: any) => {
          console.log('Get token after login with password and email');

          localStorage.setItem('token', res.access_token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.error = true;
        },
      });
  }

  submitLogin() {
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
    console.log('Login form : ', this.loginForm);
  }

  // go to homepage
  goToHomepage() {
    this.router.navigate(['/']);
  }
}
