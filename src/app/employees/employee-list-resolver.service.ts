import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs';
import { IEmployee } from '../Modules/employee.model';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeListResolverService implements   Resolve<IEmployee[]>{
    constructor(private _employeeService :EmployeeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee[]>{
         return this._employeeService.getEmployees();
    }
  
}