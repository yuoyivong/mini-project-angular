import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  users: any[] = [];

  userForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  handleSubmitUser = (e: SubmitEvent) => {
    e.preventDefault();

    this.users.push(this.userForm.value);
  };

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }
}
