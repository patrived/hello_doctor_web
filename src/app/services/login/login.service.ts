import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// Adjust the path if necessary

const URL = "http://localhost:8080/api/v1/Patient/"

@Injectable({
  providedIn: 'root'
})

export class LoginService {
 // private readonly BASIC_URL = environment.apiUrl; 
  //private email: string | null = null;

  constructor(private http: HttpClient) { 

  }

  // setEmail(email: string): void {
  //     this.email = email;
  // }

  // getEmail(): string | null {
  //     return this.email;
  // }


  loginCustomer(customer:any): Observable<any>{
    return this.http.post(URL+"login",customer);
  }
  public loginPatientToken(token: string){
localStorage.setItem('token',token);
return token;
  }

}
