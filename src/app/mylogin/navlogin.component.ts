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
              private translate: TranslateService,
              public elementRef: ElementRef) { }

  ngOnInit(): void {
    this.tokenStorage.data$.subscribe((data: any) => {
      this.userIsLogged = (data as any);
      this.emailLogin = sessionStorage.getItem('email');
     });
  }
  logOut():void{
    console.log("clicked logout");
    this.userIsLogged=false;
    this.emailLogin ='';
    this.tokenStorage.signOut();   
  }

  mouseHover( ):void{
   
    //https://stackoverflow.com/questions/42633117/how-can-i-add-a-class-to-an-element-on-hover
    console.log("ddfgsdfgsdfg");
    this.elementRef.nativeElement.classList.remove('LoginDivHide');
    //this.elementRef.nativeElement.classList.add('LoginDivShow');
  }
  
  mouseOut():void{
    console.log("saaaaaaaaaa");
    // this.elementRef.nativeElement.classList.remove('LoginDivShow');
    // this.elementRef.nativeElement.classList.add('LoginDivHide');
  }

}
