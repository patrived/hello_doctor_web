import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  postLoginCustomerForm: FormGroup | any;

  constructor(
    private LoginService: LoginService,
    private fb: FormBuilder,
    private router: Router 
  ){
   
  }
  ngOnInit() : void{
    this.postLoginCustomerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
loginPatient() {
  console.log("loginPatient method called");
  console.log('form', this.postLoginCustomerForm.value); // Check form value

  this.LoginService.loginCustomer(this.postLoginCustomerForm.value).subscribe({
    next: (res) => {
      console.log("Login success:", res);
      console.log('token',res.token)
      this.LoginService.loginPatientToken(res.token)
      // Redirect to a different page upon successful login
      this.router.navigate(['/doctorappointmentcomponent']); // Change '/dashboard' to your target route
    },
    error: (err) => {
      console.error("Login error:", err);
    },
    complete: () => {
      console.log("Login request completed");
    },
  });
  
}}
  