import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, delay, takeUntil, catchError } from 'rxjs/operators';
import { ICompanyInfo } from '../Models/company.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../app.constant';

const API_URL = AppConstants.Https_API_URL;

const refreshToken: string | null = localStorage.getItem('refreshToken');

const token = localStorage.getItem('accessToken')!;

const credentials = JSON.stringify({ accessToken: token, refreshToken });

@Injectable()
export class CompanyService {
  constructor(private _httpClient: HttpClient, private _router: Router) {}

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError('There is a problem with a service. We are notified & working on it. Please try again later.');
  }

  getListOfCompanies(): Observable<ICompanyInfo[]> {
    return this._httpClient.get<ICompanyInfo[]>(API_URL + 'companieslist')
      .pipe(
        catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(errorMsg);
        })
      );
    // .catch(this.handleError);

    // return of(this.listEmployees).pipe(delay(2000));
    // return of(this.listEmployees);
  }

  getListOfCompaniesByLogin(login :string|null): Observable<ICompanyInfo[]> {
    console.log(login);
//    return this._httpClient.get<ICompanyInfo[]>(API_URL + 'companieslist?loginId=' + login)
return this._httpClient.get<ICompanyInfo[]>(API_URL + 'companieslist')
      .pipe(
        catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(errorMsg);
        })
      );
    // .catch(this.handleError);

    // return of(this.listEmployees).pipe(delay(2000));
    // return of(this.listEmployees);
  }

  updateCompany(company: ICompanyInfo): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //put method on webapi not exist yet, need to be created
    return this._httpClient.put<void>(`${API_URL}/savecompany/${company.companyId}`, company, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        // this._router.navigate(['notfound'])
        // console.error('The server not found: ${error.message}');
        return `Not Found: ${error.message}`;
        // return `The server not found`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
}