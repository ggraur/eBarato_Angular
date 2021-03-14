import { Component, EventEmitter, Input, NgModule, OnInit, Output, ViewChild } from '@angular/core';
import { IAddress } from '../Modules/address.module';
import { NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})



export class AddressComponent implements OnInit {
  @ViewChild('addressForm') public createAddressForm!: NgForm;
  _addressLine1 = false;
  _addressLine2 = false;
  _addressLine3 = false;
  _town = false;
  _county = false;
  _postCode = false;

  @Input('inputString') inputString!: string;
  @Output() notifyOnChangeAddress: EventEmitter<IAddress> = new EventEmitter<IAddress>();

  address: IAddress = {
    addressLine1: null,
    addressLine2: null,
    addressLine3: null,
    town: null,
    county: null,
    postCode: null
  };
  constructor() { }

  onChangeEventA1(event: any) {
    const value: string = event.target.value;
    if (value.length > 0) {
      this._addressLine1 = true;
    }
    else{
      this._addressLine1 = false;
    }
    this.address.addressLine1 = value;
    this.notifyOnChangeAddress.emit(this.address);
  }
  onChangeEventA2(event: any) {
    const value: string = event.target.value;
    if (value.length > 0) {
      this._addressLine2 = true;
    }
    else{
      this._addressLine2 = false;
    }
    this.address.addressLine2 = value;
    this.notifyOnChangeAddress.emit(this.address);
  }
  onChangeEventA3(event: any) {
    this.address.addressLine3 = event.target.value;
    this.notifyOnChangeAddress.emit(this.address);
  }
  onChangeEventTown(event: any) {
    const value: string = event.target.value;
    if (value.length > 0) {
      this._town = true;
    }
    else{
      this._town = false;
    }
    this.address.town = value;
    this.notifyOnChangeAddress.emit(this.address);
  }
  onChangeEventCounty(event: any) {
    const value: string = event.target.value;
    if (value.length > 0) {
      this._county = true;
    }
    else{
      this._county = false;
    }
    this.address.county = value;
    this.notifyOnChangeAddress.emit(this.address);
  }
  onChangeEventPostCode(event: any) {
    const value: string = event.target.value;
    if (value.length > 0) {
      this._postCode = true;
    }
    else{
      this._postCode = false;
    }
    this.address.postCode = value;
    this.notifyOnChangeAddress.emit(this.address);
  }

  ngOnInit(): void {

  }

}
