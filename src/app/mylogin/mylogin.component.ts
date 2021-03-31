import { formatCurrency } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from '../app.constant';
import { IEvent } from '../Models/event.module';


const API_URL = AppConstants.Https_API_URL;

@Component({
  selector: 'app-mylogin',
  templateUrl: './mylogin.component.html',
  styleUrls: ['./mylogin.component.css']
})
export class MyloginComponent implements OnInit {

  invalidLogin!: boolean;

  constructor(private router: Router, private http: HttpClient, public translate: TranslateService,) { }

  //@Output() returnAknoledgeIsLoged:EventEmitter<boolean>=new EventEmitter<boolean>()
  

  childEvent:IEvent = new IEvent();

  public login = (form: NgForm) => {
    console.log("login:  " + API_URL)
    const credentials = JSON.stringify(form.value);
    console.log("login:  " + API_URL + " " + credentials);
    this.http.post(API_URL + "auth/login",
    credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=UTF-8"
      })          
    }).subscribe(response => {      
      const token = (<any>response).token;
      const refreshToken = (<any>response).refreshToken;
      localStorage.setItem("jwt", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.invalidLogin = false;
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
