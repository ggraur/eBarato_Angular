import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ICompanyInfo } from '../Models/company.model';

import { CompanyService } from './company.service';
//import { ResolvedCompanyList } from './resolved-companylist.model';



@Injectable()
export class CompanyListResolverService implements Resolve<ICompanyInfo[] | string>,OnInit{
    login!: string | null;

    constructor(private _companyService: CompanyService) {
        this.login = localStorage.getItem('email');
    }
    ngOnInit(): void {
        
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICompanyInfo[] | string> {
        
        let _login : string | null = localStorage.getItem('email');
        return this._companyService.getListOfCompaniesByLogin(_login)
            .pipe(
                catchError((err: string) => of(err))
            );
    }

}
