import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  errDesc = 'The resurse you are looking for cannot be found';
  routeParams: Params | undefined;
  queryParams: Params | undefined;
  id!: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.getRouteParams();
  }

  ngOnInit(): void {
  }
  getRouteParams() {
    // Route parameters
    this.activatedRoute.params.subscribe(params => {
      this.routeParams = params;
      this.id = params.one;
      console.log('ID: ' + this.id);
    });

    // URL query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      this.id = params.id;
      //        console.log(this.queryParams);
    });

    if (this.id == '1201'){
      this.errDesc = 'Invalid activation link';
    }
    if (this.id == '1202'){
      this.errDesc = 'User not found';
    }
    if (this.id == '200'){
      this.errDesc = 'User successfully activated';
    }
  }
}

// https://www.kevinleary.net/angular-component-url-parameters/ parsing
