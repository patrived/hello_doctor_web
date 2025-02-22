import { Component, ElementRef, QueryList, ViewChildren, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonserviceService } from 'src/app/services/commonservice/commonservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent implements OnInit {
  @ViewChildren('otpInput') otpElements!: QueryList<ElementRef>;

  old_email: any | undefined = this.commonservice.getEmail();

  otpform: FormGroup|any
  timeLeft: number = 10;
  interval: any;
  patient: any;

  constructor(private fb: FormBuilder, 
    private commonservice: CommonserviceService,
    private router: Router    
  ) {
    this.otpform = this.fb.group({
      otp: this.fb.array(new Array(6).fill('').map(() => new FormControl('')))
    });
  }
  
  get otpControls(): FormControl[] {
    return (this.otpform.get('otp') as FormArray).controls as FormControl[];
  }

  ngOnInit() {

    this.startCountdown();
    setTimeout(() => this.otpElements.first?.nativeElement.focus(), 0);
    this.commonservice.getPatientbyEmail(this.commonservice.getEmail()).subscribe({
      next: (response) => {
        this.patient = response;
        console.log('patient 37 ',response)
      },
      error: (err) => {
        console.error("Error fetching patient data:", err);
      }

    });
    console.log('updateEmail',this.commonservice.getEmail())
    console.log('48',this.old_email)
  }


  onInput(index: number, event: any) {
    const value = event.target.value;
    if (!/^\d$/.test(value)) {
      this.otpControls[index].setValue('');
      return;
    }

    if (index < this.otpControls.length - 1) {
      this.otpElements.get(index + 1)?.nativeElement.focus();
    }
  }

  onKeydown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      this.otpControls[index].setValue('');
      if (index > 0) {
        this.otpElements.get(index - 1)?.nativeElement.focus();
      }
    }
  }

  startCountdown() {
    clearInterval(this.interval);
    this.timeLeft = 10;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  resendOtp() {
    Swal.fire({
      title: 'OTP Sent!',
      text: 'A new OTP has been sent to your registered email.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.startCountdown();
    });
  }

  verifyOtp() {
    if (this.isOtpComplete()) {
      alert('OTP Verified: ' + this.otpControls.map(control => control.value).join(''));
    } else {
      alert('Please enter complete OTP');
    }
  }

  isOtpComplete(): boolean {
    return this.otpControls.every(control => control.value !== '');
  }
}
