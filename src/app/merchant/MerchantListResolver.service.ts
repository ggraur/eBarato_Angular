import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMerchant } from '../Modules/merchant.model';
import { MerchantService } from './merchant.service';
// import { ResolvedMerchantList } from './resolved-merchantlist.model';

@Injectable()
export class MerchantListResolverService implements Resolve<IMerchant[] | string>{
    constructor(private _merchantService: MerchantService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMerchant[] | string> {
        return this._merchantService.getMerchants()
            .pipe(
                catchError((err: string ) => of( err))
            );
    }

}