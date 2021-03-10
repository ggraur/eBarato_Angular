import { Injectable } from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, delay, takeUntil, catchError } from 'rxjs/operators';
import { IEmployee } from "../Modules/employee.model";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { HttpHeaders } from '@angular/common/http';



@Injectable()
export class EmployeeService {
  constructor(private _httpClient: HttpClient, private _router: Router) {

  }

  baseUrl = 'http://localhost:3000/employees';

  private listEmployees: IEmployee[] = [
    {
      id: 1,
      fullName: 'Mark, 1',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date('10/25/1988'),
      department: '3',
      isActive: true,
      photoPath: '../assets/Images/1.png',
      password: '',
      confirmPassword: '',
      phoneNumber: 2345978640
    },
    {
      id: 2,
      fullName: 'Mary, 2',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 2345978640,
      dateOfBirth: new Date('11/20/1979'),
      department: '2',
      isActive: false,
      photoPath: '../assets/Images/3.jfif',
      password: '',
      confirmPassword: '',
    },
    {
      id: 3,
      fullName: 'John, 3',
      gender: 'Male',
      contactPreference: 'Email',
      phoneNumber: 5432978640,
      dateOfBirth: new Date('3/25/1976'),
      department: '3',
      isActive: false,
      photoPath: '../assets/Images/2.jfif',
      password: '',
      confirmPassword: '',
    },
    {
      id: 4,
      fullName: 'Annete, 4',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 5432978642,
      dateOfBirth: new Date('4/22/1974'),
      department: '3',
      isActive: true,
      photoPath: '../assets/Images/4.jfif',
      password: '',
      confirmPassword: '',

    },
    {
      id: 5,
      fullName: 'Anton,5 ',
      gender: 'Male',
      contactPreference: 'Post',
      phoneNumber: 5432978641,
      dateOfBirth: new Date('5/22/1975'),
      department: '3',
      isActive: false,
      photoPath: '../assets/Images/5.jfif',
      password: '',
      confirmPassword: '',
    },
  ];

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);

    } else {
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError('There is a problem with a service. We are notified & working on it. Please try again later.');
  }
  getEmployees(): Observable<IEmployee[]> {
    return this._httpClient.get<IEmployee[]>(this.baseUrl)
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
      )


    // .catch(this.handleError);

    // return of(this.listEmployees).pipe(delay(2000));
    //return of(this.listEmployees);
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

  getEmployeesCount(): number {
    return this.listEmployees.length;
  }
  getEmployee(employeeId: number): Observable<IEmployee> {
    return this._httpClient.get<IEmployee>(`${this.baseUrl}/${employeeId}`)
      .pipe(catchError(this.handleError));
  }


  delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));

    // const deleteId = this.listEmployees.findIndex(e => e.id == id);
    // if (deleteId !== -1) {
    //   this.listEmployees.splice(deleteId, 1)
    // }
  }

  addEmployee(employee: IEmployee): Observable<IEmployee> | undefined | null {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._httpClient.post<IEmployee>(this.baseUrl, employee, httpOptions)
      .pipe(catchError(this.handleError));


  }

  update(employee: IEmployee): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, httpOptions)
      .pipe(catchError(this.handleError));
  }


}