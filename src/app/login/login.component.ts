import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { transAnimation } from '../animations';
import { IUser } from '../Models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  logedUser!: string;
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  firstLogin = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService
    , private tokenStorage: TokenStorageService
    , private _router: Router
  ) { }

  ngOnInit(): void {
    console.log('login component ');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      (data: IUser) => {
        this.tokenStorage.saveToken(<any>data.accessToken);
        this.tokenStorage.saveUser(data);
        this.logedUser = email;
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.firstLogin = <any>data.firstLogin;
        this.roles = this.tokenStorage.getUser().roles;

        console.log(`first login value: ${this.firstLogin}`);
        if (this.firstLogin == true) {
          this._router.navigate['myaccount'];
        }
        //        this.reloadPage();
      },
      (err: { error: { message: string; }; }) => {
        console.log(JSON.stringify(err));
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
