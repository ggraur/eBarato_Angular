import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Department } from '../Modules/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IMerchant } from '../Modules/merchant.model';
import { ICountry } from '../Modules/country.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAddress } from '../Modules/address.module';
import { MerchantService } from './merchant.service';

 

@Component({
  selector: 'app-create-merchant',
  templateUrl: './create-merchant.component.html',
  styleUrls: ['./create-merchant.component.css']
})


export class CreateMerchantComponent implements OnInit {

  @Input('selectedLng') selectedLng!:string;

  countries!: ICountry[];
  newcntryCode!: string;
  validNif: boolean = false;
  // cntry!: ICountry;
  @ViewChild('merchantForm') public createMerchantForm!: NgForm;
  merchant: IMerchant = {
    id: null,
    merchantName: null,
    repFullName: null,
    email: null,
    nif: null,
    country: null,
    address: {addressLine1:null,addressLine2:null,addressLine3:null,county:null,postCode:null,town:null },
    phoneNumber: null,
    mobileNumber: null,
    contactPreference: null,
    isActive: null,
    logoPath: null
  }
  cntry!: ICountry;
  constructor(private httpService: HttpClient, public translate: TranslateService,
    // private _merchantService: MerchantService,
    private _router: Router) {
    // this.merchant.contactPreference = "Email";
    this.merchant.isActive = true;
  }
  
  onVerifyNif(event: any) {
    let value: string = event.target.value;
    let bRez: boolean = this.IsValidContrib(value);
    this.validNif = bRez;
    console.log(value);
  }

  IsValidContrib(contrib: string): boolean {

    var  isNum :boolean = typeof contrib == 'number';

    //const isNum = isNumeric(contrib) ? Number(contrib) : 0;
   // || isNum == 0
    if (contrib == null || contrib == "" || isNum == true ) {
      return false;
    }
    if ((contrib.length != 9)) {
      return false;
    }
    var sS: number[] = (Array.from(contrib) as Array<unknown>) as Array<number>;
    var nString: number[] = (Array.from(contrib.substring(1, 9)) as Array<unknown>) as Array<number>;

    if ((contrib.length == 9)) {
      let c: number = +sS[0];
      let i1: number = 0;
      let checkDigit: number = 0;

      var arrInt: number[] = [1, 2, 5, 6, 8, 9]
      var firstCharEqualToC: boolean = arrInt.includes(c);

      if (firstCharEqualToC) {
        checkDigit = c * 9;

        i1 = 1;
        for (let n of nString) {
          i1++;
          if (i1 < 9) {
            checkDigit += (n * (10 - i1));
          }
        }
        checkDigit = 11 - (checkDigit % 11);

        if ((checkDigit >= 10)) {
          checkDigit = 0;
        }
        else {
          if (checkDigit == sS[8])
          {
            //console.log("Numéro de contribuinte:{contrib} validado com sucesso!");
            return true;
          }
        }
      }
    }
    return false;
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
    //  if (this.merchant.id == null) {
    //   const newMerchant: IMerchant = Object.assign({}, this.merchant);
    //   // https://www.youtube.com/watch?v=KNI66wZcaf8, explaining that line
    //   this._merchantService.addMerchant(newMerchant)?.subscribe(
    //     (data: IMerchant) => {
    //       console.log(data);
    //       this.createMerchantForm.reset();
    //       this._router.navigate(['merchants']);
    //     },
    //     (error: any) => console.log(error)
    //   );
    // } else {
    //   this._merchantService.update(this.merchant)?.subscribe(
    //     () => {
    //       this.createMerchantForm.reset();
    //       this._router.navigate(['list']);
    //     },
    //     (error: any) => console.log(error)
    //   );
    // }
  }
  notifyChangeAddress(address: IAddress) {
    this.merchant.address = address;
    var dataString = JSON.stringify(address);
    console.log(dataString)
  }
  notifyChangeCountry(ctry: ICountry) {
    this.merchant.country = ctry;
    //  console.log("this.merchant.country : " + this.merchant.country.code);
  }

  onRdbPostSelected(event: any){
    let target: string = event.target;
    
    console.log("onRdbPostSelected : " + event);
  }


 
}
