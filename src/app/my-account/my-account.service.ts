import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, delay, takeUntil, catchError } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../app.constant';
import { ErrorService } from '../_services/error.service';
import { IAccountInfo } from '../Models/accountinfo.model';


const API_URL = AppConstants.Https_API_URL ;
const httpOptions =AppConstants.ApplicationHeaders;

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//      'X-Content-Type-Options': 'no-sniff',
//      'Access-Control-Allow-Credentials': 'true'
//   })
// };

@Injectable()
export class AccountInfoService{
    constructor(
          private _httpClient: HttpClient
        , private _router: Router
        , private _errorService : ErrorService) {

    }

    saveAccountInfo(accInfo: IAccountInfo): Observable<IAccountInfo> | undefined | null {
       // console.log("URL: " + AUTH_API + 'user/SaveAccountInfo');
       
        return this._httpClient.post<IAccountInfo>(API_URL + 'user/SaveAccountInfo', accInfo, httpOptions)
          .pipe(catchError(this._errorService.handleErrors));
      }

      getAccountInfo(accInfo: IAccountInfo): Observable<IAccountInfo> {
          return this._httpClient.post<IAccountInfo>(API_URL + 'user/getaccontinfo', accInfo, httpOptions)
         .pipe(catchError(this._errorService.handleErrors));
      }

      public firstLogin(accInfo: IAccountInfo): Observable<IAccountInfo> {
         return this._httpClient.post<IAccountInfo>(API_URL + 'user/firstlogin', accInfo, httpOptions)
         .pipe(catchError(this._errorService.handleErrors));
         //  return false;
      }

    } 