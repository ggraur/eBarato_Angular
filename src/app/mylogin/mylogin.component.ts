import { formatCurrency } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isNumber } from 'ngx-bootstrap/chronos/utils/type-checks';
import { AppConstants } from '../app.constant';
import { IEvent } from '../Models/event.module';
import { IUser } from '../Models/user.model';
import { TokenStorageService } from '../_services/token-storage.service';


const API_URL = AppConstants.Https_API_URL;

@Component({
  selector: 'app-mylogin',
  templateUrl: './mylogin.component.html',
  styleUrls: ['./mylogin.component.css']
})
export class MyloginComponent implements OnInit {

  invalidLogin!: boolean;


  constructor(private router: Router
    , private http: HttpClient
    , private translate: TranslateService
    , private tokenStorage: TokenStorageService) {
  }

  //@Output() returnAknoledgeIsLoged:EventEmitter<boolean>=new EventEmitter<boolean>()

errorMessage!:string;
  childEvent: IEvent = new IEvent();
  signedUser: IUser = new IUser();;

  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value).replace('Email', 'Username');
    let str = JSON.parse(credentials);
    
    //console.log("str:" + credentials);

    this.http.post(API_URL + "account/authenticate",
      credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=UTF-8"
      })
    }).subscribe(response => {

      let aToken: string = (<any>response).accessToken!;
      let rToken: string = (<any>response).refreshToken!;
      this.signedUser.email=str.Username;
      this.signedUser.password=str.password;
      this.signedUser.accessToken = aToken;
      this.signedUser.refreshToken = rToken;
      this.signedUser.logedIn = true;
      this.invalidLogin = false;
      this.tokenStorage.saveUser(this.signedUser);
      this.router.navigate(["/"]);
    }, err => {
        this.errorMessage = err.error.message;
        this.invalidLogin = true;
    });
  }
  // login(form: NgForm) {
  //   const credentials = {
  //     'username': form.value.username,
  //     'password': form.value.password
  //   }
  //  // console.log(JSON.stringify(credentials));
  //   //$http.post('/someUrl', data, config).then(successCallback, errorCallback);

  //   this.http.post(API_URL + "auth/login", credentials)
  //     .subscribe(response => {
  //       const token = (<any>response).token;
  //       localStorage.setItem("jwt", token);
  //       this.invalidLogin = false;
  //       this.router.navigate(["/"]);
  //     }, err => {
  //       this.invalidLogin = true;
  //     })
  // }
  ngOnInit(): void {
  }

}
