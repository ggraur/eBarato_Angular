import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/do';
import { HTTP_INTERCEPTORS, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { HttpCasheService } from '../_services/cache.service';
import { tap } from 'rxjs/operators';

// https://floyk.com/en/post/angular-cache-requests
// https://www.bing.com/videos/search?q=angular+caching+service+example&&view=detail&mid=34100AC117B02904615B34100AC117B02904615B&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3Dangular%2Bcaching%2Bservice%2Bexample%26FORM%3DHDRSC3

@Injectable()
export class cacheInterceptor implements HttpInterceptor {
    /**
     *
     */
    constructor(private cacheService: HttpCasheService) { }


    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //     if(req.method !== 'GET'){
    //         // delete cache on any other request type  - if you want
    //        //this.cacheService.clearCache();

    //      }else{
    //        if(!this.cacheService.includesDoNotCache(req.url)){
    //          // check do we have this request cached and return it
    //          const cachedResponse = this.cacheService.getCachedResponse(this.cacheService.encodeURL(req.url));
    //          if (cachedResponse) {
    //            console.log("serving from cache");
    //            return of(cachedResponse);
    //          }
    //        }
    //      }

    //      return next.handle(req)
    //      .pipe(
    //        tap(event => {
    //          if (event instanceof HttpResponse) {
    //            // should we cache reqeust?
    //            if(req.method === 'GET' &&
    //              !this.cacheService.includesDoNotCache(req.url) &&
    //              req.url.includes('/api/')
    //            ){

    //              this.cacheService.cacheResponse(this.cacheService.encodeURL(req.url), event);

    //            }
    //         }
    //     }));
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("Hi, this is an Cache interceptor");
        if (req.urlWithParams.indexOf("/authenticate") < 0) {
            const cacheResponse = this.cacheService[req.urlWithParams] || null;
            if (cacheResponse) {
          //      console.log('Response from cache');
                return of(cacheResponse);
            }

        }

        return next.handle(req).pipe(tap((event: any) => {
            if (event instanceof HttpResponse && req.urlWithParams.indexOf("/authenticate") < 0) {
                this.cacheService[req.urlWithParams] = event;
            //    console.log('Response from server');
            }
        }));
    }

}

export const cacheInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: cacheInterceptor, multi: true }
];