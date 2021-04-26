import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {Directive, HostListener, ElementRef} from '@angular/core';

 
@Component({
  selector: 'app-navlogin',
  templateUrl: './navlogin.component.html',
  styleUrls: ['./navlogin.component.css']
})
export class NavloginComponent implements OnInit {
  hoverClass: any;
  userIsLogged = false;
  emailLogin!:string | null;
  isCompany = false;

  constructor(private tokenStorage: TokenStorageService, 
              public elementRef: ElementRef,
              public translate: TranslateService) { }

  ngOnInit(): void {
    this.tokenStorage.data$.subscribe((data: any) => {
      this.userIsLogged = (data as any);
      this.emailLogin = localStorage.getItem('email');

      // let b = localStorage.getItem('isCompany');
      // if(b===null || b ==='false' || b === 'undefined'){
      //   this.isCompany = false;
      // }
      // if(b==='true'){
      //   this.isCompany = true;
      // }
     });
     this.tokenStorage.dataIsCompany$.subscribe((dataIsCompany: any) => {
      this.isCompany = (dataIsCompany as any);
     });


  }
  logOut():void{
    console.log("clicked logout");
    this.userIsLogged=false;
    this.emailLogin ='';
    this.tokenStorage.signOut();   
  }



}
