import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ICompanyInfo } from '../Models/company.model';

import { CompanyService } from './company.service';
//import { ResolvedCompanyList } from './resolved-companylist.model';



@Injectable()
export class CompanyListResolverService implements Resolve<ICompanyInfo[] | string>{
    login!: string | null;

    constructor(private _companyService: CompanyService) {
        this.login = localStorage.getItem('email');
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICompanyInfo[] | string> {
        return this._companyService.getListOfCompaniesByLogin(this.login)
            .pipe(
                catchError((err: string) => of(err))
            );
    }

}
