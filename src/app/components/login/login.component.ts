import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // constructor(private loginForm: FormBuilder) {}

  users: any[] = [];

  // user = this.loginForm.group({
  //   email: ['', Validators.required, Validators.email],
  //   // email : '',
  //   password: '',
  // });

  userForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  handleSubmitUser = (e: SubmitEvent) => {
    e.preventDefault();

    this.users.push(this.userForm.value);
    console.log(this.userForm);
  };

  get email() {
    return this.userForm.get('email')
  }

  get password() {
    return this.userForm.get('password')
  }
}
