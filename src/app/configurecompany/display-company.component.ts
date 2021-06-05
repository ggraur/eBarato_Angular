import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICompanyInfo } from '../Models/company.model';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-display-company',
  templateUrl: './display-company.component.html',
  styleUrls: ['./display-company.component.css']
})
export class DisplayCompanyComponent implements OnInit {

  private _companyId:string;
  selectedCompanyId:string|undefined;

  @Output() notifyDelete: EventEmitter<string> = new EventEmitter<string>();
  confirmDelete = false;

  @Input() searchTerm!: string;
  @Input()
  set companyId(val: string) {
    console.log('CompanyID changed from ' + JSON.stringify(this.companyId) + ' to ' + JSON.stringify(val));
    this._companyId = val;
  }
  get employeeId(): string { return this._companyId; }

  private _company!: ICompanyInfo;

  @Input()
  set company(val: ICompanyInfo) {
    // console.log('Previous : ' + (this._employee ? this._employee.fullName : 'NULL'));
    // console.log('Current : ' + val.fullName );
    this._company = val;
  }

  // @Output() notify: EventEmitter<IEmployee> = new EventEmitter<IEmployee>();

  get company(): ICompanyInfo {
    return this._company;
  }

  constructor(private _route: ActivatedRoute, private _cmpService: CompanyService,
    private _router: Router) {
      this._companyId = '';
     }
  
     deleteCompany(){
      this._cmpService.delete(this.company.companyId!).subscribe(
        () => console.log(`Company with Id = ${this.company.companyId} deleted.`),
        (err) => console.log()
      );
      this.notifyDelete.emit(this.company.companyId!);
    }
    viewCompany() {
      this._router.navigate(['/company', this.company.companyId], {
        queryParams: { searchTerm: this.searchTerm}
      });
    }
    editCompany(){
      this._router.navigate(['/editEmployee', this.company.companyId]
      );
    }

  ngOnInit(): void {
  }

}
