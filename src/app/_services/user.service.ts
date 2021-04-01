import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConstants } from '../app.constant';

const API_URL = AppConstants.Https_API_URL ;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
   // console.log('getPublicContent: ' + API_URL);
    return this.http.get(API_URL + 'test/all', { responseType: 'text' })
    .pipe(catchError(this.handleErrors) );
  }

  getUserBoard(): Observable<any> {
    console.log('getUserBoard');
    return this.http.get(API_URL + 'user', { responseType: 'text' }).pipe(catchError(this.handleErrors) );
  }

  getModeratorBoard(): Observable<any> {
    console.log('getModeratorBoard');
    return this.http.get(API_URL + 'mod', { responseType: 'text' }).pipe(catchError(this.handleErrors) );
  }

  getAdminBoard(): Observable<any> {
    console.log('getAdminBoard');
    return this.http.get(API_URL + 'admin', { responseType: 'text' }).pipe(catchError(this.handleErrors) );
  }

  private handleErrors(errorResponse:HttpErrorResponse){
    // https://www.youtube.com/watch?v=X8hLraWnVhw, handle errors 
    
    if(errorResponse instanceof ErrorEvent){
       console.error('Client Side Error: ', errorResponse);
    }else {
      console.error('Server Side Error',errorResponse);
       
    }

    return   throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}