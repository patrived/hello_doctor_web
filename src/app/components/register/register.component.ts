import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, State, City } from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city'
import { RegisterService } from 'src/app/services/register/register.service';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {

  registerPatientForm: FormGroup | any;
  profilephoto: string | ArrayBuffer | null = null;
  profilePhotoFile: File | null = null;

  constructor(private regiseterService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private mat: MatSnackBar,

  ) {

  }

  countries: ICountry[] = [];
  states: IState[] = [];
  cities: ICity[] = [];


  selectedCountry: string = '';
  selectedState: string = '';
  selectedCity: string = '';

  ngOnInit(): void {
    this.registerPatientForm = this.fb.group({
      firstName: [null, Validators.required],
      fatherName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null, Validators.required],
      address2: [null, Validators.required],
      landmark: [null, Validators.required],
      country: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
      mobile: [null, Validators.required],
      alternateNumber: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      profilephoto: [null, Validators.required]

    });

    this.loadCountries();
  }

  loadCountries(): void {
    this.countries = Country.getAllCountries();
  }

  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCountry = selectElement.value;

    if (this.selectedCountry) {
      this.states = State.getStatesOfCountry(this.selectedCountry);
      this.cities = []; // Clear cities if the country changes
      this.selectedState = '';
      this.selectedCity = '';
    }
  }

  onStateChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedState = selectElement.value;

    if (this.selectedState) {
      this.cities = City.getCitiesOfState(this.selectedCountry, this.selectedState);
      this.selectedCity = '';
    }
  }

  onCityChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCity = selectElement.value;
  }


  onProfilePictureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, or GIF).');
        return;
      }

      const maxSizeInMB = 2;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert('File size exceeds 2MB. Please upload a smaller image.');
        return;
      }
      this.profilePhotoFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.profilephoto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  getBackgroundStyle(): { [key: string]: string } {
    return this.profilephoto
      ? { 'background-image': `url(${this.profilephoto})`, 'background-size': 'cover', 'background-position': 'center' }
      : { 'background-image': "url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/svgs/solid/user-plus.svg')", 'background-size': '50%', 'background-position': 'center', 'background-repeat': 'no-repeat', 'background-color': '#f8f9fa' };
  }

  postRegister() {
    console.log('register request', this.postRegister);
    if (!this.profilephoto) {
      this.mat.open('Please upload a profile picture', 'Close')
      return;
    }
    const patientData = this.registerPatientForm.value;
    console.log(">>>",patientData);
    
    const formData = new FormData();
    formData.append('patient', JSON.stringify(patientData));
    formData.append('file',this.profilePhotoFile!);
  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
});
    this.regiseterService.postRegister(formData)
      .subscribe({
        next: (res: any) => {
          console.log('Success:', res);
          this.mat.open('complete', 'close')
          this.router.navigate(['/success']); // Redirect on success
        },
        error: (err: any) => {
          console.error('Error:', err);
          this.mat.open('uncomplete', 'close')
          this.router.navigate(['/failure']); // Redirect on failure
        }
      });
  }
  private showSnackbar(message: string, action: string) {
    this.mat.open(message, action, {
      duration: 5000,  // Snackbar visible for 5 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}