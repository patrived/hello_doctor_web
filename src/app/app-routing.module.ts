import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationresponseComponent } from './registrationresponse/registrationresponse.component';
import { DoctorAppointmentComponent } from './components/doctor-appointment/doctor-appointment.component';
import { SuccessComponent } from './components/success/success.component';
import{FailureComponent} from'./components/failure/failure.component'
const routes: Routes = [
  {
    path:'patient',component:RegisterComponent
  },

  {
    path:'login',component:LoginComponent
  },
  {
    path:'',component:LoginComponent
  },
  {
    path:'regiresponse',component:RegistrationresponseComponent
  },
  {
    path:'doctorappointmentcomponent' ,component:DoctorAppointmentComponent
  },
{
  path:'success',component:SuccessComponent
},
{
  path:'failure',component:FailureComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
