import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PasswordValidation } from './password-validation';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  users: any[] = [];

  // user = this.loginForm.group({
  //   email: ['', Validators.required, Validators.email],
  //   // email : '',
  //   password: '',
  // });

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%*?&])[A-Za-z0-9@#$!%*?&]{8,}'
      ),
    ]),
  });

  handleSubmitUser = (e: SubmitEvent) => {
    e.preventDefault();

    // this.users.push(this.userForm.value);
    // console.log(this.userForm);

    const loginRequest = {
      email: this.userForm.value.email!,
      password: this.userForm.value.password!,
    };
    this.authService.userLogin(loginRequest).subscribe((response) => {
      console.log('res : ', response);
      localStorage.setItem('token', response.payload.token);
      this.router.navigate(['/sidebar/board'])
    });
  };

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }
}
