import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loginForm: FormBuilder) {}

  users: any[] = [];

  user = this.loginForm.group({
    email: ['', Validators.required, Validators.email],
    // email : '',
    password: '',
  });

  handleSubmitUser = (e: SubmitEvent) => {
    e.preventDefault();

    this.users.push(this.user.value);
    console.log(this.user);
  };
}
