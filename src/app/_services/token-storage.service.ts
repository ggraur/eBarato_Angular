import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUser } from '../Models/user.model';


// const TOKEN_KEY = 'auth-token';
// const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  public isLoged = new Subject<boolean>();
  data$ = this.isLoged.asObservable();

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem("accessToken");
    window.sessionStorage.setItem("accessToken", token);
    
  }

  updateIsLoged(data:boolean){
    this.isLoged.next(data);
  } 

  public getToken(): string | null {
    return window.sessionStorage.getItem("accessToken");
  }

  public saveUser(user: IUser): void {
    let sUser = JSON.stringify(user);
    //console.log("saveUser function Logged User is: " + sUser);

    //  window.sessionStorage.removeItem("accessToken");
    //  window.sessionStorage.setItem("accessToken", JSON.stringify(user));

    sessionStorage.setItem("accessToken",<any>user.accessToken!);
    sessionStorage.setItem("refreshToken", <any>user.refreshToken!); 
    sessionStorage.setItem("email", <any>user.email!); 
    //sessionStorage.setItem("email", <any>user.email!);

    localStorage.setItem("accessToken",<any>user.accessToken!);
    localStorage.setItem("refreshToken", <any>user.refreshToken!); 
    localStorage.setItem("email", <any>user.email!); 

  }
 

  public getUser(): any {
    const refreshToken = window.sessionStorage.getItem("refreshToken");
    if (refreshToken) {
      return refreshToken ;//JSON.parse(user);
    }
    return {};
  }
}