import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUser } from '../Models/user.model';
import { AuthService } from './auth.service';


// const TOKEN_KEY = 'auth-token';
// const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private authService: AuthService) { }
  public isLoged = new Subject<boolean>();
  data$ = this.isLoged.asObservable();

 public signOut(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.updateIsLoged(false);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem('accessToken');
    window.sessionStorage.setItem('accessToken', token);
    window.localStorage.removeItem('accessToken');
    window.localStorage.setItem('accessToken', token);
  }

  updateIsLoged(data: boolean): void{
    this.isLoged.next(data);
  }
  public getToken(): string | null {
    let _tknAccess: string | null = window.localStorage.getItem('accessToken');
    let _tknRefresh : string | null = window.localStorage.getItem('refreshToken');

    // this.authService.refreshToken(_tknRefresh).subscribe(
    //   (      data: IUser) => {
    //     if(data)
    //     {
    //       this.saveUser(data);
    //     }
 
    //   },
    //   (      err: { error: { message: string; }; }) => {
    //     console.log(JSON.stringify(err));
    //     // this.errorMessage = err.error.message;
    //     // this.isLoginFailed = true;
    //   }
    //);

    return _tknAccess;
  }
  public saveUser(user: IUser): void {
    const sUser = JSON.stringify(user);
    sessionStorage.setItem('accessToken', user.accessToken! as any);
    sessionStorage.setItem('refreshToken', user.refreshToken! as any);
    sessionStorage.setItem('email', user.email! as any);
    localStorage.setItem('accessToken', user.accessToken! as any);
    localStorage.setItem('refreshToken', user.refreshToken! as any);
    localStorage.setItem('email', user.email! as any);
   // console.log('user loged:' + (user.logedIn as any));
    this.updateIsLoged(user.logedIn as any);
    //this.isLoged.next(user.logedIn as any);
  }
  public getUser(): any {
    const refreshToken = window.sessionStorage.getItem('refreshToken');
    if (refreshToken) {
      return refreshToken ; // JSON.parse(user);
    }
    return {};
  }
}
