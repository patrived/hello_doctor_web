import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl; 

@Injectable({
  providedIn: 'root'
})


export class VerifyotpService {
  
  constructor(private http: HttpClient) { }
  
  verifyOtp(patient: any): Observable<any> {
    return this.http.post(BASE_URL+"verify", patient);
  }
}
