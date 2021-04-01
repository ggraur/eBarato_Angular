import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

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
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  updateIsLoged(data:boolean){
    this.isLoged.next(data);
  } 

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
     let sUser = JSON.stringify(user);
     console.log("Logged User is: " + sUser);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
//   public saveUser(user: IUser): void {
//     let sUser = JSON.stringify(user);
//     console.log("Logged User is: " + sUser);
//     window.sessionStorage.removeItem(USER_KEY);
//     window.sessionStorage.setItem(USER_KEY, user.email!);
//     localStorage.setItem("jwt",user.accessToken!);
//     localStorage.setItem("refreshToken", user.refreshToken!);
// }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}