import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Department } from '../Modules/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IMerchant } from '../Modules/merchant.model';
import { ICountry } from '../Modules/country.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-create-merchant',
  templateUrl: './create-merchant.component.html',
  styleUrls: ['./create-merchant.component.css']
})


export class CreateMerchantComponent implements OnInit {

  countries!: ICountry[];
  newcntryCode! : string;
  // cntry!: ICountry;
  @ViewChild('merchantForm') public createEmployeeForm!: NgForm;
  merchant: IMerchant = {
    id: null,
    merchantName: null,
    repFullName: null,
    email: null,
    nif: null,
    country: null,
    address: undefined,
    phoneNumber: null,
    mobileNumber: null,
    contactPreference: null,
    isActive: null,
    logoPath: null
  }
  cntry!: ICountry;
  constructor(private httpService: HttpClient) {
    // this.merchant.contactPreference = "Email";
    this.merchant.isActive = true;
  }

  ngOnInit(): void {
    this.httpService.get('./assets/countries/countries.json').subscribe(
      data => {
        this.countries = data as ICountry[];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    )
  }
  saveMerchant() {

  }

  notifyChange(ctry:ICountry) {
      this.merchant.country = ctry;
    //  console.log("this.merchant.country : " + this.merchant.country.code);
  }
}
