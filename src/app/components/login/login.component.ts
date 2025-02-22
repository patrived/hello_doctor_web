import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonserviceService } from 'src/app/services/commonservice/commonservice.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  postLoginCustomerForm: FormGroup | any;
  otp:boolean = false

  constructor(
    private LoginService: LoginService,
    private fb: FormBuilder,
    private router: Router ,
    private commonservice: CommonserviceService
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
    next: (res: any) => {
      console.log("Login success:", res);

      if (res?.message && res?.email) {
        this.otp = true;
        this.commonservice.setEmail(res.email);
        console.log('Customer email:', res.email);

        // Navigate to OTP screen if message indicates OTP was sent
        if (res.message.includes("OTP has been sent")) {
          console.log("Navigating to OTP screen...");
         // this.router.navigate(['/otp']);
        }
      } else {
        console.error("Unexpected response format:", res);
      }
    },
    error: (err) => {
      console.error("Login error:", err);
    }
  });
}

  
}
  