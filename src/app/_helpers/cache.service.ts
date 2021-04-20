import { HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { AppConstants } from '../app.constant';
import { TokenStorageService } from '../_services/token-storage.service';



abstract class HttpCache {
    abstract get(req: HttpRequest<any>): HttpResponse<any> | null;
    abstract get(req: HttpRequest<any>, resp: HttpResponse<any>): void;
}

const API_URL = AppConstants.Https_API_URL;

@Injectable({ providedIn: 'root' })
export class HttpCasheService implements HttpCache {
    private cache: any = {};

    doNotCache = [
        this.tokenStorage.signOut()
    ]

    constructor(private tokenStorage: TokenStorageService) { }

    put(req: any, resp?: any): void {
        this.cache[req.urlWithParams] = resp;
    }
    get(req: HttpRequest<any>): HttpResponse<any> | null {
        return this.cache[req.urlWithParams];
    }

    cacheResponse(responseURL: string, response: HttpResponse<any>): void {
        this.cache[responseURL] = response;
    }

    getCachedResponse(requestURL: string): HttpResponse<any> | null {
        return this.cache[requestURL];
    }

    deleteCachedResponse(requestURL: string) {
        this.cache[requestURL] = null;
    }

    clearCache() {
        this.cache = {};
    }

    getAllCached() {
        return this.cache;
    }

    encodeURL(url: any) {
        return encodeURIComponent(url);
    }

    decodeURL(url: any) {
        return decodeURIComponent(url);
    }

    includesDoNotCache(path: any) {

        let url = this.encodeURL(path);

        for (let i = 0; i < this.doNotCache.length; i++) {
            if (path.includes(this.doNotCache[i])) {
                return true;
            }
        }
        return false;
    }
}
