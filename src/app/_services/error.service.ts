import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConstants } from '../app.constant';

const API_URL = AppConstants.Https_API_URL;
@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    public handleErrors(errorResponse: HttpErrorResponse) {
        // https://www.youtube.com/watch?v=X8hLraWnVhw, handle errors

        if (errorResponse instanceof ErrorEvent) {
            console.error('Client Side Error: ', errorResponse);
        } else {
            console.error('Server Side Error', errorResponse);

        }

        return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
    }
}