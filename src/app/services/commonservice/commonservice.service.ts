import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommonserviceService {
  private BASE_URL= environment.apiUrl; // env url 

  constructor(private http:HttpClient) { }
  //shared data //
  private email: string | null = null;

    setEmail(email: string): void {
        this.email = email;
    }

    getEmail(): string | null {
        return this.email;
    }
 
  getPatientbyEmail(email:any):Observable<any>{
    return this.http.get(this.BASE_URL+"byEmail/"+email);
  }
}
