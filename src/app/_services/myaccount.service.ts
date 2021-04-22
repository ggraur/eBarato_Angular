import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConstants } from '../app.constant';
import { ErrorService } from './error.service';

const API_URL = AppConstants.Https_API_URL;

const httpOptions = {
  //  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})
export class MyAccountService{
    constructor(
          private http: HttpClient
        , private error:ErrorService) { }
    getUserFirstLogin():Observable<any> {
        console.log("getUserFirstLogin:" + "getUserFirstLogin")
        return this.http.get(API_URL + 'test/all', { responseType: 'text' })
    .pipe(catchError(this.error.handleErrors) );
    }
}