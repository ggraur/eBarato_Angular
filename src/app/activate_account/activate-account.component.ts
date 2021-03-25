import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router, RoutesRecognized } from '@angular/router';
import { delay, expand, skip, startWith, switchMap } from 'rxjs/operators';
 

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit, OnDestroy {
  // id!: any;
  // token!: any;
  // name!:any;
    private sub:any;

  routeParams!: Params;
  
  queryParams!: Params;
  parentRouteParams!: Params;
  constructor(private activatedRoute: ActivatedRoute, private _router: Router ) { }

  // ngOnInit(): void {
  //   // https://betterprogramming.pub/angular-6-url-parameters-860db789db85
  //   let id = this.activatedRoute.snapshot.paramMap.get('id');
  //   console.log('Method 1 id :' +this.id);
  //   this.activatedRoute.paramMap.pipe(delay(1500)).subscribe(params => {
  //     this.id = params.get("id")
      
  //   });
  //   console.log('Method 2 id :' +this.id);

  //   this.name = this.activatedRoute.snapshot.queryParamMap.get("token")
  //   this.activatedRoute.queryParamMap.subscribe(queryParams => {
  //     this.name = queryParams.get("token")
  //   })
  //   console.log('Method 3 token :' +this.name);

  //   this.activatedRoute.paramMap.pipe(
  //     switchMap((params: ParamMap) : any =>{
  //       this.name  = params.get("token");
  //     })
  //   )

  //   console.log('Method 4 token :' + this.name);

  //   this.activatedRoute.paramMap.pipe(
  //     expand((params: ParamMap) : any =>{
  //       this.name  = params.get("token");
  //     })
  //   )

  //   console.log('Method 5 token :' + this.name);

  //   this.name = this.activatedRoute.paramMap.pipe(
  //     switchMap((params: ParamMap) : any  => {
  //       const id = +(params.get("id"))!;
        
  //     })
  //   )
  //   console.log('Method 6 token :' + JSON.stringify( this.name) );

  //   // this._router.events.pipe(skip(1)).subscribe((event: Event | any) => {
  //   //   if (!!event && event instanceof RoutesRecognized) {
  //   //     const params = event.state.root.firstChild!.params;
  //   //    // const params = event.state.root.firstChild.queryParams; // <-- or you need this one?
  //   //     console.log('Query params are', params)
  //   //   }
  //   // });

  //   // let url = window.location.href;
  //   // console.log('My URL ' + url);

  //   // this.activatedRoute.queryParams.pipe(delay(1500)).subscribe(params => {
  //   //   let productid = params['id'];
  //   //   let color = params['token'];
      
  //   //   console.log(productid);// OUTPUT 1534
  //   //   console.log(color);// OUTPUT red
  //   // });
    
  // }
  ngOnInit() {
    // this.getRouteParams();
    
    this.activatedRoute.fragment.subscribe((fragment: string) => {
	
      console.log(fragment);// OUTPUT ?productid=1543&color=red

      const urlParams = new URLSearchParams(fragment);
	  
      const token = urlParams.get('token')
      console.log(token); // OUTPUT 1543
	  
      // const color = urlParams.get('color')
      // console.log(color); // OUTPUT red
	  
    })

  }

  // Store parameter values on URL changes
  getRouteParams() {

      // Route parameters
      this.activatedRoute.params.subscribe( params => {
          this.routeParams = params;
      });

      // URL query parameters
      this.activatedRoute.queryParams.subscribe( params => {
          this.queryParams = params;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getParentParams() {

    // This would store the value of the :section parameter
    this.parentRouteParams = this.activatedRoute.parent!.params;
}

  getQueryParams() {
    return window.location.search.length === 0
      ? {}
      : window.location.search
        .substr(1)
        .split('&')
        .map(pairString => pairString.split('='))
        .reduce((out, pair) => {
          out[pair[0]] = pair[1];
          return out;
        }, {} as Params);
  }

  // getParameterByName(name: any) {
  //   let url = window.location.href;
  //   name = name.replace(/[[]]/g, "\$&");
  //   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  //     results = regex.exec(url);
  //   if (!results) {
  //     return null;
  //   }
  //   if (!results[2]) {
  //     return '';
  //   } else {
  //     return decodeURIComponent(results[2].replace(/+/g, " "));
  //   }
  // }
    
}
