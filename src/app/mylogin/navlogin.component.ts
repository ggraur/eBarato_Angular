import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-navlogin',
  templateUrl: './navlogin.component.html',
  styleUrls: ['./navlogin.component.css']
})
export class NavloginComponent implements OnInit {
  
  userIsLogged:boolean = false;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.tokenStorage.data$.subscribe(data=>{
      console.log('passed here NavloginComponent:')
      this.userIsLogged =(<any>data).isLoged;
      
    })
  }

}