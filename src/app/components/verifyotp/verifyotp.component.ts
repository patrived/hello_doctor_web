import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent {
  otp: string[] = ['', '', '', ''];
  timeLeft: number = 10;
  otpInputs = new Array(6).fill('');
  
  @ViewChildren('otpInput') otpElements!: QueryList<ElementRef>;

  ngOnInit() {
    this.startCountdown();
    setTimeout(() => this.otpElements.first?.nativeElement.focus(), 0);
  }

  onInput(index: number, event: any) {
    if (event.data && event.data.match(/\d/)) {
      if (index < this.otp.length - 1) {
        this.otpElements.get(index + 1)?.nativeElement.focus();
      }
    } else {
      this.otp[index] = '';
    }
  }

  onKeydown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      this.otp[index] = '';
      if (index > 0) {
        this.otpElements.get(index - 1)?.nativeElement.focus();
      }
    }
  }

  startCountdown() {
    const interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  resendOtp() {
    Swal.fire({
      title: 'OTP Sent!',
      text: 'A new OTP has been resent to your registered email.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.timeLeft = 10; // Reset timer
      this.startCountdown();
    });
  }
  

  verifyOtp() {
    if (this.isOtpComplete()) {
      alert('OTP Verified: ' + this.otp.join(''));
    } else {
      alert('Please enter complete OTP');
    }
  }

  isOtpComplete(): boolean {
    return this.otp.every((digit) => digit !== '');
  }
}

