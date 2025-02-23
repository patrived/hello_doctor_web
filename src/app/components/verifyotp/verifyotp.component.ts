import { Component, ElementRef, QueryList, ViewChildren, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonserviceService } from 'src/app/services/commonservice/commonservice.service';
import { VerifyotpService } from 'src/app/services/verifyotp/verifyotp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent implements OnInit {
  @ViewChildren('otpInput') otpElements!: QueryList<ElementRef>;

  old_email: string = ''; // Ensures it is always a string
  otpform: FormGroup;
  timeLeft: number = 10;
  interval: any;
  patient: any;

  constructor(
    private fb: FormBuilder,
    private commonservice: CommonserviceService,
    private router: Router ,
    private otpservice: VerifyotpService 
  ) {
    this.otpform = this.fb.group({
      otp: this.fb.array(new Array(6).fill('').map(() => new FormControl('')))
    });
  }

  get otpControls(): FormControl[] {
    return (this.otpform.get('otp') as FormArray).controls as FormControl[];
  }

  ngOnInit() {
    this.old_email = this.commonservice.getEmail() ?? '';  // Ensures old_email is always a string

    this.startCountdown();
    setTimeout(() => this.otpElements.first?.nativeElement.focus(), 0);

    this.commonservice.getPatientbyEmail(this.old_email).subscribe({
      next: (response) => {
        this.patient = response;
        console.log('Patient Data:', response);
      },
      error: (err) => {
        console.error("Error fetching patient data:", err);
      }
    });

    console.log('Retrieved Email:', this.old_email);
  }

  // Verify button action
  verifyOtp() {
    if (this.isOtpComplete()) {
      const otpValue = this.otpControls.map(control => control.value).join(''); // Combine OTP digits
      const payload = {
        email: this.old_email,
        otp: otpValue
      };

      this.otpservice.verifyOtp(payload).subscribe({
        next: () => {
          Swal.fire({
            title: 'OTP Verified!',
            text: 'Your OTP has been successfully verified.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/admin']); // Redirect after successful verification
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Verification Failed',
            text: 'Invalid OTP. Please try again.',
            icon: 'error',
            confirmButtonText: 'Retry'
          });
          console.error("Error verifying OTP:", err);
        }
      });

    } else {
      Swal.fire({
        title: 'Incomplete OTP',
        text: 'Please enter the complete OTP.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
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

  isOtpComplete(): boolean {
    return this.otpControls.every(control => control.value !== '');
  }
}
