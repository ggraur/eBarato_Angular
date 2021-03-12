import { Component, OnInit } from '@angular/core';
import { IAddress } from '../Modules/address.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {
  address: IAddress = {
    addressLine1: null,
    addressLine2: null,
    addressLine3: null,
    town: null,
    county: null,
    postCode: null
  };
  constructor() { }

  ngOnInit(): void {
  }

}
