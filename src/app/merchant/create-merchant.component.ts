import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Department } from '../Modules/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IMerchant } from '../Modules/merchant.model';

@Component({
  selector: 'app-create-merchant',
  templateUrl: './create-merchant.component.html',
  styleUrls: ['./create-merchant.component.css']
})
export class CreateMerchantComponent implements OnInit {
    @ViewChild('merchantForm') public createEmployeeForm!: NgForm;
    merchant:IMerchant={
      id: null,
      merchantName: null,
      repFullName : null,
      email: null,
      nif: null,
      country: null,
      address1: null,
      address2: null,
      address3: null,
      address4: null,
      phoneNumber: null,
      mobileNumber: null,
      contactPreference: null,
      isActive: null,
      logoPath: null
    }
  constructor() { 
    this.merchant.contactPreference = "Email";
  }

  ngOnInit(): void {
  }
  saveMerchant()
  {

  }
}
