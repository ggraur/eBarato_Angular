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

  constructor(private tokenStorage: TokenStorageService, 
              public elementRef: ElementRef,
              public translate: TranslateService) { }

  ngOnInit(): void {
    this.tokenStorage.data$.subscribe((data: any) => {
      this.userIsLogged = (data as any);
      this.emailLogin = localStorage.getItem('email');
     });
  }
  logOut():void{
    console.log("clicked logout");
    this.userIsLogged=false;
    this.emailLogin ='';
    this.tokenStorage.signOut();   
  }



}
