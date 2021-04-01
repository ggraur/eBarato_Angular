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
    , private tokenStorage: TokenStorageService) { }

  //@Output() returnAknoledgeIsLoged:EventEmitter<boolean>=new EventEmitter<boolean>()


  childEvent: IEvent = new IEvent();
  
  signedUser! : IUser;

  public login = (form: NgForm) => {
   // console.log("login:  " + API_URL)
    const credentials = JSON.stringify(form.value);
   // console.log("login:  " + API_URL + " " + credentials);
    this.http.post(API_URL + "auth/login",
      credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=UTF-8"
      })
    }).subscribe(response => {
    //  this.signedUser.accessToken = (<any>response).accessToken!;
    //  this.signedUser.refreshToken = (<any>response).refreshToken!;
    //  this.signedUser.logedIn = true;
       const token = (<any>response).token;
       const refreshToken = (<any>response).refreshToken;
      //  this.signedUser.accessToken = token;
      //  this.signedUser.refreshToken = refreshToken;
      // localStorage.setItem("jwt", this.signedUser.accessToken!);
      // localStorage.setItem("refreshToken", this.signedUser.refreshToken!);
      this.invalidLogin = false;
      this.tokenStorage.saveUser(response);
      this.router.navigate(["/"]);
    }, err => {
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
