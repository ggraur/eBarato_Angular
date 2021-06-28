import { Injectable, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, delay, takeUntil, catchError, tap } from 'rxjs/operators';
import { ICompanyInfo } from '../Models/company.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../app.constant';
import { ErrorService } from '../_services/error.service';

const API_URL = AppConstants.Https_API_URL;

const httpOptions = AppConstants.ApplicationHeaders;

const refreshToken: string | null = localStorage.getItem('refreshToken');

const token = localStorage.getItem('accessToken')!;

const credentials = JSON.stringify({ accessToken: token, refreshToken });

@Injectable()
export class CompanyService  implements OnInit  {
  constructor(private _httpClient: HttpClient
    , private _router: Router
    , private _errorService: ErrorService) { }

  ngOnInit(): void {
    this.getListOfCompanies();
  }

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
  
  // public firstLogin(accInfo: IAccountInfo): Observable<IAccountInfo> {
  //   return this._httpClient.post<IAccountInfo>(API_URL + 'user/firstlogin', accInfo, httpOptions)
  //     .pipe(catchError(this._errorService.handleErrors));
  //   //  return false;
  // }
  // getListOfCompaniesByLogin(_login: string|null): Observable<ICompanyInfo[]> {
  //   console.log('getListOfCompaniesByLogin: ' + _login);
  //        return this._httpClient.post<ICompanyInfo[]>(API_URL + 'Company/companieslistbylogin', _login, httpOptions)
  //                  .pipe(catchError(this._errorService.handleErrors));
  // }

  getListOfCompaniesByLogin(login: string | null): Observable<ICompanyInfo[]> {
     console.log('Url:' + API_URL + 'company/companieslistbylogin?_login=' + login);
    //    return this._httpClient.get<ICompanyInfo[]>(API_URL + 'companieslist?loginId=' + login)
    return this._httpClient.get<ICompanyInfo[]>(API_URL + 'company/companieslistbylogin?_login=' + login)
    //return this._httpClient.get<ICompanyInfo[]>(API_URL + 'companieslistbylogin?loginId=' + login)
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
        console.error('The server not found: ${error.message}');
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

  delete(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${API_URL}company/delete/${id}`)
      .pipe(catchError(this.handleError));

    // const deleteId = this.listEmployees.findIndex(e => e.id == id);
    // if (deleteId !== -1) {
    //   this.listEmployees.splice(deleteId, 1)
    // }
  }

  addCompany(company: ICompanyInfo): Observable<ICompanyInfo> | undefined | null {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._httpClient.post<ICompanyInfo>(API_URL +'/company/savecompany', company, httpOptions)
      .pipe(catchError(this.handleError));
  }
 
  saveCompanyInfo(companyInfo: ICompanyInfo): Observable<ICompanyInfo> | undefined | null {
        
    //console.log("URL: " + API_URL + 'company/savecompany');
    companyInfo.login = localStorage.getItem('email')!;
    return this._httpClient.post<ICompanyInfo>(API_URL + 'Company/savecompany', companyInfo, httpOptions)
      .pipe(catchError(this._errorService.handleErrors));
  }

  getCompanyInfoById(cmpInfo: ICompanyInfo ): Observable<ICompanyInfo> {
    return this._httpClient.post<ICompanyInfo>(API_URL + 'Company/getcompanybyid', cmpInfo, httpOptions)
      .pipe(catchError(this._errorService.handleErrors));
  }

  getCompanyInfo(cmpInfo: ICompanyInfo): Observable<ICompanyInfo> {
    return this._httpClient.post<ICompanyInfo>(API_URL + 'Company/getcompany', cmpInfo, httpOptions)
      .pipe(
        catchError(this._errorService.handleErrors));
  }

  getCompanyInfoByCompanyID(cmpId: string|null): Observable<ICompanyInfo> {
    return this._httpClient.post<ICompanyInfo>(API_URL + 'Company/getCompanyInfoByCompanyID', cmpId, httpOptions)
      .pipe(tap(data => console.log(JSON.stringify(data)))
      ,catchError(this._errorService.handleErrors));
  }


  getCompanyInfoByCompanyID1(cmpId: string | null): Observable<ICompanyInfo> {
    console.log('Url:' + API_URL + 'company/getCompanyInfoByCompanyID?Id=' + cmpId);
   //    return this._httpClient.get<ICompanyInfo[]>(API_URL + 'companieslist?loginId=' + login)
   return this._httpClient.get<ICompanyInfo>(API_URL + 'company/getCompanyInfoByCompanyID?Id=' + cmpId)
   //return this._httpClient.get<ICompanyInfo[]>(API_URL + 'companieslistbylogin?loginId=' + login)
     .pipe(
      tap(data => console.log(JSON.stringify(data)),
       catchError(error => {
         let errorMsg: string;
         if (error.error instanceof ErrorEvent) {
           errorMsg = `Error: ${error.error.message}`;
         } else {
           errorMsg = this.getServerErrorMessage(error);
         }
         return throwError(errorMsg);
       })
     ));
   // .catch(this.handleError);

   // return of(this.listEmployees).pipe(delay(2000));
   // return of(this.listEmployees);
 }

  getCompaniesInfo(cmpInfo: ICompanyInfo): Observable<ICompanyInfo[]> {
    return this._httpClient.post<ICompanyInfo[]>(API_URL + 'Company/getcompanieslist', cmpInfo, httpOptions)
      .pipe(catchError(this._errorService.handleErrors));
  }
}