import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm !: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      readerName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      role: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    // this.registerForm = new FormGroup({
    //   readerName : new FormControl(null, [Validators.required]),
    //   email : new FormControl(null, [Validators.required, Validators.email]),
    //   password : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    //   role : new FormControl(null, [Validators.required])
    // })
  }

  handleSubmit () {
    console.log(this.registerForm);
  }
  
}
