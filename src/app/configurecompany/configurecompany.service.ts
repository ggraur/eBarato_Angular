import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, delay, takeUntil, catchError } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../app.constant';
import { ErrorService } from '../_services/error.service';
import { IAccountInfo } from '../Models/accountinfo.model';
import { ICompanyInfo } from '../Models/company.model';


const API_URL = AppConstants.Https_API_URL;
const httpOptions = AppConstants.ApplicationHeaders;

@Injectable()
export class ConfigureCompanyService {
    constructor(
          private _httpClient: HttpClient
        , private _router: Router
        , private _errorService: ErrorService
    ) { }
    saveCompanyInfo(companyInfo: ICompanyInfo): Observable<ICompanyInfo> | undefined | null {
        
        //console.log("URL: " + API_URL + 'company/savecompany');
        companyInfo.login = localStorage.getItem('email')!;
        return this._httpClient.post<ICompanyInfo>(API_URL + 'Company/savecompany', companyInfo, httpOptions)
          .pipe(catchError(this._errorService.handleErrors));
      }
}