import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { EmployeeService } from "./employee.service";

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate {
    constructor(private _employeeService: EmployeeService,
        private _router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const emplyeeExist = !!this._employeeService.getEmployee(+(route.paramMap.get('id') || '0'));
        if (emplyeeExist) {
            return true;
        } else {
            this._router.navigate(['notfound']);
            return false;
        }
    }

}
