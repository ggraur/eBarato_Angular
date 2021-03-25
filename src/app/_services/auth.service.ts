import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export class RegisterUser {
  email!: string;
  password!: string;
  confirmPassword!: string;
 
}
 

const AUTH_API = 'http://localhost:5000/api/account/';

const httpOptions = {
//  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  headers: new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    return this.http.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }
  register(email: string, password: string, confirmPassword: string): Observable<any> {
    
     console.log('username:' + email, 'password:' + password, 'confirmPassword:' + confirmPassword);
    console.log(JSON.stringify({
      email,
      password,
      confirmPassword
    }));
    
    return this.http.post(AUTH_API  + 'signup', JSON.stringify({
      email,
      password,
      confirmPassword
    }), httpOptions);
  }

  handleError(err:any) {
     let message = '';
     if(err.error instanceof ErrorEvent) {
      message = err.error!.message;
     } else {
      message = `Error Code: ${err.status}\nMessage: ${err!.message}`;
     }
     console.log(message);
     return throwError(message);
  }
 
  // register(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'signup', {
  //     username,
  //     email,
  //     password
  //   }, httpOptions);
  // }
}
