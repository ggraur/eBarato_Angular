import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMerchant } from '../Models/merchant.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
    confirmPassword: null
  };

  public error!: string;

  @Input('merchantCode') merchantCode!: number;
  
  merchants! : IMerchant[];

  selectedMerchantID!: number;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  constructor(private _router: Router, private _route: ActivatedRoute) { 
    const resolvedData: IMerchant[] | string = this._route.snapshot.data.merchantList;
    if (Array.isArray(resolvedData)) {
      this.merchants = resolvedData;
    } else {
      // console.log('merchant I\'m passing here');
      this.error = resolvedData!;
    }
  }
  selected() {
    //  console.log("child component emit: " +  JSON.stringify(this._country))
    // this._country = this.countries.find(x => x.code == this.cntryCode)!;
    // this.notifyOnChangeCountry.emit( this._country );
  }
  ngOnInit(): void {
    const { email, password, confirmPassword } = this.form;
  }
  onSubmit() {

  }
}
