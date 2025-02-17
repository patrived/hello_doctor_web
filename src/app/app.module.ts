import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule,FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DoctorAppointmentComponent } from './components/doctor-appointment/doctor-appointment.component';
import { SuccessComponent } from './components/success/success.component';
import{FailureComponent} from'./components/failure/failure.component'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SpecializationComponent } from './components/specialization/specialization.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DoctorAppointmentComponent,
    SuccessComponent,
    FailureComponent,
    SpecializationComponent,
    AdminDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
