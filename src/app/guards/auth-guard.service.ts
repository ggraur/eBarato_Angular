import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AppConstants } from "../app.constant";

const API_URL = AppConstants.Https_API_URL;

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService, private http: HttpClient) {
    //console.log("Passing into guard constructor");
  }
  async canActivate() {
    const token = localStorage.getItem("jwt")!;
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token));
      return true;
    }
    const isRefreshSuccess = await this.tryRefreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigate(["login"]);
    }
    return isRefreshSuccess;
  }

  // canActivate(){
  //     const token = localStorage.getItem("jwt");
  //    // console.log("Token" + token);
  //     if(token && !this.jwtHelper.isTokenExpired(token)){
  //      //   console.log("Token return : " + true);
  //         return true;

  //     }
  //     // console.log("Token return : " + false);

  //     this.router.navigate(["mylogin"]);

  //     return false;
  // }

  // .subscribe(response => {      
  //   const token = (<any>response).token;
  //   const refreshToken = (<any>response).refreshToken;
  //   localStorage.setItem("jwt", token);
  //   localStorage.setItem("refreshToken", refreshToken);
  //   this.invalidLogin = false;
  //   this.router.navigate(["/"]);
  // }, err => {
  //   this.invalidLogin = true;
  // });
  
  isRefreshSuccess!: boolean;

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string | null = localStorage.getItem("refreshToken");
    if (!token || !refreshToken) {
      return false;
    }
    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
   
    try {
      console.log("Passei por aqui:");
      const response = await this.http.post(API_URL + "token/refresh", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        observe: 'response'
      }).subscribe(response => {
        const token = (<any>response).token;
        const refreshToken = (<any>response).refreshToken;
        localStorage.setItem("jwt", token);
        localStorage.setItem("refreshToken", refreshToken);
        this.isRefreshSuccess = true;
        return this.isRefreshSuccess;
      }, err => {
        this.isRefreshSuccess = false;
        return this.isRefreshSuccess;
      });
    }
    catch (ex) {
      this.isRefreshSuccess = false;
    }
    return this.isRefreshSuccess;




    //   // If token refresh is successful, set new tokens in local storage.
    //   const newToken = (<any>response).body.accessToken;
    //   const newRefreshToken = (<any>response).body.refreshToken;
    //   localStorage.setItem("jwt", newToken);
    //   localStorage.setItem("refreshToken", newRefreshToken);
    //   isRefreshSuccess = true;
    // }
    // catch (ex) {      
    //   isRefreshSuccess = false;
    // }
    // return isRefreshSuccess;
  }

  // private async tryRefreshingTokens(token: string): Promise<boolean> {
  //     // Try refreshing tokens using refresh token
  //     const refreshToken: string  | null  = localStorage.getItem("refreshToken");
  //     if (!token || !refreshToken) { 
  //       return false;
  //     }
  //     const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
  //     let isRefreshSuccess: boolean;
  //     try {
  //     console.log("Passei por aqui:");
  //       const response = await this.http.post(API_URL + "token/refresh", credentials, {
  //         headers: new HttpHeaders({
  //           "Content-Type": "application/json"
  //         }),
  //         observe: 'response'
  //       }).toPromise();





  //       // If token refresh is successful, set new tokens in local storage.
  //       const newToken = (<any>response).body.accessToken;
  //       const newRefreshToken = (<any>response).body.refreshToken;
  //       localStorage.setItem("jwt", newToken);
  //       localStorage.setItem("refreshToken", newRefreshToken);
  //       isRefreshSuccess = true;
  //     }
  //     catch (ex) {      
  //       isRefreshSuccess = false;
  //     }
  //     return isRefreshSuccess;
  //   }
}
//example on
//https://www.youtube.com/watch?v=NSQHiIAP7Z8