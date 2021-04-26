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
  
  public isCompany = new Subject<boolean>();
  dataIsCompany$ = this.isCompany.asObservable();


 public signOut(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.updateIsLoged(false);
  }

  updateIsLoged(data: boolean): void{
    this.isLoged.next(data);
  }

  public updateIsCompany(data: boolean): void{
    this.isCompany.next(data);
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
    sessionStorage.setItem('isCompany', user.isCompany! as any);
    
    localStorage.setItem('accessToken', user.accessToken! as any);
    localStorage.setItem('refreshToken', user.refreshToken! as any);
    localStorage.setItem('email', user.email! as any);
    localStorage.setItem('isCompany', user.isCompany! as any);
   
    this.updateIsLoged(user.logedIn as any);
    this.updateIsCompany(user.isCompany as any);
    
  }
  public getUser(): any {
    const refreshToken = window.sessionStorage.getItem('refreshToken');
    if (refreshToken) {
      return refreshToken ; // JSON.parse(user);
    }
    return {};
  }
}
