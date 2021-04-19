import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMerchant } from '../Models/merchant.model';
import { MerchantService } from './merchant.service';

@Component({
  selector: 'app-display-merchant',
  templateUrl: './display-merchant.component.html',
  styleUrls: ['./display-merchant.component.css']
})
export class DisplayMerchantComponent implements OnInit {

  private _merchantId: number;
  selectedMerchantId: number | undefined;

  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;

  @Input() searchTerm!: string;
  @Input()
  set employeeId(val: number) {
    console.log('EmployeeID changed from ' + JSON.stringify(this.employeeId) + ' to ' + JSON.stringify(val));
    this._merchantId = val;
  }
  get employeeId(): number { return this._merchantId; }


  private _merchant!: IMerchant;

  @Input()
  set merchant(val: IMerchant) {
    // console.log('Previous : ' + (this._employee ? this._employee.fullName : 'NULL'));
    // console.log('Current : ' + val.fullName );
    this._merchant = val;
  }

  // @Output() notify: EventEmitter<IEmployee> = new EventEmitter<IEmployee>();

  get merchant(): IMerchant {
    return this._merchant;
  }



  constructor(private _route: ActivatedRoute, private _mrchService: MerchantService,
              private _router: Router, ) {
    this._merchantId = 0;

  }
  deleteEmployee(){
    this._mrchService.delete(this.merchant.id!).subscribe(
      () => console.log(`Employee with Id = ${this.merchant.id} deleted.`),
      (err) => console.log()
    );


    this.notifyDelete.emit(this.merchant.id!);
  }


  ngOnInit(): void {
    this.selectedMerchantId = + (this._route.snapshot.paramMap.get('id') || '0');
    console.log('_selectedEmployeeId : ' + this.selectedMerchantId);
  }

  editEmployee(){
    this._router.navigate(['/editEmployee', this.merchant.id]
    );
  }
  viewEmployee() {
    this._router.navigate(['/employees', this.merchant.id], {
      queryParams: { searchTerm: this.searchTerm}
    });
  }



  deleteMerchant(){

  }
  viewMerchant(){

  }
  editMerchant(){

  }
}
