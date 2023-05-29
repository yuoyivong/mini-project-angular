import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  users: any[] = [];

  userForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%*?&])[A-Za-z0-9@#$!%*?&]{8,}'
      ),

      // Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9 ]{8,}$')
    ]),
  });

  handleSubmitUser = (e: SubmitEvent) => {
    e.preventDefault();

    // this.users.push(this.userForm.value);
    const signUpRequest = {
      email: this.userForm.value.email!,
      password: this.userForm.value.password!,
    };

    this.authService.userRegistration(signUpRequest).subscribe((response) => {
      console.log('Response : ', response);
      this.router.navigate(['/login-component']);
    });
  };

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }
}
