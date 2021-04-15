import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IEvent } from './Models/event.module';

import { TokenStorageService } from './_services/token-storage.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // animation triggers go here
  ]
})

export class AppComponent implements OnInit {
  
  private roles: string[] = [];
  userIsLogged : boolean = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;



  title = 'eBarato';
  // public selectedLng: string  = 'pt';
  showLoadingIndicator = true;
  constructor(private _router: Router, public translate: TranslateService, private tokenStorageService: TokenStorageService) {

    translate.addLangs(['en', 'pt']);
    translate.setDefaultLang('en');

    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }
      if (routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false;
      }
      if (routerEvent instanceof NavigationError) {
        this.showLoadingIndicator = false;
      }
    });
  }

  switchLang(lang: string) {
//    this.selectedLng = lang;
    this.translate.use(lang);
    // console.log("Language used: " + lang)
  }
  ngOnInit(): void {
    this.userIsLogged = !!this.tokenStorageService.getToken();
    
    // console.log("Roles: " + JSON.stringify(this.userIsLogged));

    if (this.userIsLogged) {
      const user = this.tokenStorageService.getUser();
      console.log("Loged User : " + JSON.stringify(user));

      this.roles = user.roles;
     // console.log("Roles: " + JSON.stringify(this.roles));

      /*
      // review and solve that situation.
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      */
      this.username = user.username;
    }
  }
  
 

  logout(): void {
    localStorage.removeItem("jwt");

    this.tokenStorageService.signOut();
    window.location.reload();
  }
  
}
