import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  private BASE_URL= environment.apiUrl; // env url 

  constructor(private httpcilent: HttpClient) { }


  postRegister(formData: any): Observable<any> { 
     return this.httpcilent.post(this.BASE_URL+'registerPatient',formData);
  } 


  
}
