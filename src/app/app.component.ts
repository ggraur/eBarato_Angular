import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel,NavigationError } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'eBarato';
  showLoadingIndicator = true;
  constructor(private _router: Router, public translate: TranslateService) {

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
    this.translate.use(lang);
    console.log("Language used: " + lang)
  }

}
