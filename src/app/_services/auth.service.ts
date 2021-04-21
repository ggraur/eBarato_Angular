import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppConstants } from '../app.constant';
// import * as moment from "moment";

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
  setSession: any;
  constructor(private http: HttpClient) { 
    //let v:number=10;
  }

  login(email: string, password: string): Observable<any> {
    console.log('Login method:' + AUTH_API );
    return this.http.post(AUTH_API + 'Account/Authenticate', {
      email,
      password
    }, httpOptions);
  }

  refreshToken(token:string | null){
    console.log('Refresh Token method:' + AUTH_API );
    return this.http.post(AUTH_API + 'Account/refresh-token', {
      token
    }, httpOptions);
  }

  register(email: string, password: string, confirmPassword: string): Observable<any> {

    // console.log('username:' + email, 'password:' + password, 'confirmPassword:' + confirmPassword);
    // console.log(JSON.stringify({
    //   email,
    //   password,
    //   confirmPassword
    // }));

    return this.http.post(AUTH_API + 'account/register', JSON.stringify({
      email,
      password,
      confirmPassword
    }), httpOptions);
  }

  handleError(err: any): any{
    let message = '';
    if (err){
      if (err.error instanceof ErrorEvent) {
        message = err.error.message;
      } else {
        message = `Error Code: ${err.status}\nMessage: ${err.message}`;
      }
    }


    // console.log(message);
    return throwError(message);
  }

  // register(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'signup', {
  //     username,
  //     email,
  //     password
  //   }, httpOptions);
  // }

  //#region angular method to sign in
//   login2Method(email:string, password:string ) {
//     return this.http.post<User>('/api/login', {email, password})
//         .do( res=>this.setSession2)
//         .shareReplay();
// }

// private setSession2(authResult :any ) {
//   const expiresAt = moment().add(<any>authResult.expiresIn,'second');

//   localStorage.setItem('id_token',<any>authResult.idToken);
//   localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
// }

// logout() {
//   localStorage.removeItem("id_token");
//   localStorage.removeItem("expires_at");
// }

// public isLoggedIn() {
//   return moment().isBefore(this.getExpiration());
// }

// isLoggedOut() {
//   return !this.isLoggedIn();
// }

// getExpiration() {
//   const expiration = localStorage.getItem("expires_at");
//   const expiresAt = JSON.parse(expiration!);
//   return moment(expiresAt);
// }

  //#endregion
}
