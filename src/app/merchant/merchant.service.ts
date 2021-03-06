import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, delay, takeUntil, catchError } from 'rxjs/operators';
import { IMerchant } from '../Modules/merchant.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class MerchantService {
  constructor(private _httpClient: HttpClient, private _router: Router) {

  }

  baseUrl = 'http://localhost:3000/merchants';


  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);

    } else {
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError('There is a problem with a service. We are notified & working on it. Please try again later.');
  }

  getMerchants(): Observable<IMerchant[]> {
    return this._httpClient.get<IMerchant[]>(this.baseUrl)
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

  // getEmployeesCount(): number {
  //   return this.listEmployees.length;
  // }
  getMerchant(employeeId: number): Observable<IMerchant> {
    return this._httpClient.get<IMerchant>(`${this.baseUrl}/${employeeId}`)
      .pipe(catchError(this.handleError));
  }


  delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));

  }

  addMerchant(merchant: IMerchant): Observable<IMerchant> | undefined | null {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._httpClient.post<IMerchant>(this.baseUrl, merchant, httpOptions)
      .pipe(catchError(this.handleError));
  }

  update(merchant: IMerchant): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.put<void>(`${this.baseUrl}/${merchant.id}`, merchant, httpOptions)
      .pipe(catchError(this.handleError));
  }


}
