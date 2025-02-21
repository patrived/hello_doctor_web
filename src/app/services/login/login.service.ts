import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = "http://localhost:8080/api/v1/Patient/"

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { 

  }
  loginCustomer(Patient: any): Observable<any> {
    return this.http.post(URL + "login", Patient)
    } 
 
  public loginPatientToken(token: string){
localStorage.setItem('token',token);
return token;
  }

}
