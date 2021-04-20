import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppConstants } from '../app.constant';

const API_URL = AppConstants.Https_API_URL;

@Injectable()
export class AuthGuard implements CanActivate {

  isRefreshSuccess!: boolean;

  constructor(private router: Router, private jwtHelper: JwtHelperService, private http: HttpClient) {
  }
  async canActivate() {

    const token = localStorage.getItem('accessToken')!;

    const tkIsExpired = this.jwtHelper.isTokenExpired(token);

    if (token && !tkIsExpired) {
      return true;
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(token);

    if (isRefreshSuccess === undefined || isRefreshSuccess === false) {
      console.log('navigate to login');
      this.router.navigate(['mylogin']);

    }
    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string | boolean): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    if (!token || !refreshToken) {
      return false;
    }
    const credentials = JSON.stringify({ accessToken: token, refreshToken });
    try {
      // console.log("Passei por aqui:");
      const response = await this.http.post(API_URL + 'token/refresh', credentials, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        observe: 'response'
      }).subscribe(response => {
        const token = (response as any).token;
        const refreshToken = (response as any).refreshToken;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        this.isRefreshSuccess = true;
        return this.isRefreshSuccess;
      }, err => {
        this.isRefreshSuccess = false;
        return false;
      });
    }
    catch (ex) {
      this.isRefreshSuccess = false;
    }
    return this.isRefreshSuccess;
  }
}
// example on
// https://www.youtube.com/watch?v=NSQHiIAP7Z8
