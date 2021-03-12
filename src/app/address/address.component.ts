import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAddress } from '../Modules/address.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {
  // _addressLine1!:string ;
  // _addressLine2!:string ;
  // _addressLine3!:string ;
  // _town!:string ;
  // _county!:string ;
  // _postCode!:string ;

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

  onChangeEventA1(event: any){
    console.log(event.target.value);
    this.address.addressLine1 = event.target.value;
    this.notifyOnChangeAddress.emit(this.address);
  }
  onChangeEventA2(event: any){
    console.log(event.target.value);
    this.address.addressLine2 = event.target.value;
    this.notifyOnChangeAddress.emit(this.address);
  }
  onChangeEventA3(event: any){
    console.log(event.target.value);
    this.address.addressLine3 = event.target.value;
    this.notifyOnChangeAddress.emit(this.address);
  }
  onChangeEventTown(event: any){
    console.log(event.target.value);
    this.address.town = event.target.value;
    this.notifyOnChangeAddress.emit(this.address);
  }
  onChangeEventCounty(event: any){
    console.log(event.target.value);
    this.address.county = event.target.value;
    this.notifyOnChangeAddress.emit(this.address);
  }
  onChangeEventPostCode(event: any){
    console.log(event.target.value);
    this.address.postCode = event.target.value;
    this.notifyOnChangeAddress.emit(this.address);
  }

  ngOnInit(): void {

  }

}
