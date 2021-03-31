import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppConstants } from '../app.constant';


export class RegisterUser {
  email!: string;
  password!: string;
  confirmPassword!: string;

}

const AUTH_API = AppConstants.Https_API_URL;

const httpOptions = {
  //  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log("Login method:" + AUTH_API );
    return this.http.post(AUTH_API + 'auth/login', {
      email,
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

    return this.http.post(AUTH_API + 'account/signup', JSON.stringify({
      email,
      password,
      confirmPassword
    }), httpOptions);
  }
  handleError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
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
