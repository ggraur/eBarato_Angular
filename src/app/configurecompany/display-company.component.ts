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

  private _companyId: string;
  selectedCompanyId: string | undefined;

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

  constructor(private _route: ActivatedRoute,
    private _cmpService: CompanyService,
    private _router: Router) {
    this._companyId = '';
    
    const id: string = _route.snapshot.params.companyId;
  }

  deleteCompany() {
    this._cmpService.delete(this.company.companyId!).subscribe(
      () => console.log(`Company with Id = ${this.company.companyId} deleted.`),
      (err) => console.log()
    );
    this.notifyDelete.emit(this.company.companyId!);
  }
  viewCompany() {
    //this.company.login = localStorage.getItem('email');
    const cmpId = this.company.companyId;
     console.log('passamos o parametro cmpId:' +cmpId);
    this._router.navigate(['/configurecompany',cmpId]);


    // let login = localStorage.getItem('email');

    // this._cmpService.getCompanyInfoById(this.company).subscribe(
    //   (response) => {
    //     this.company = response;
    //     this._router.navigate(['configurecompany']
    //       , { queryParams: { myCompany: this.company } });

    //     // this._router.navigate(['/configurecompany', this.company.companyId], {
    //     //   queryParams: { searchTerm: this.searchTerm}
    //     // });
    //     // if (this.companiesList.length > 1) {
    //     //   this.router.navigate(['companieslist']);
    //     // } else if (this.companiesList.length <= 1) {
    //     //   this.router.navigate(['configurecompany']);
    //     // } ;
    //   }
    // ), (err: any) => console.log(err);
    // //trebuie de schimbat


    // // this._router.navigate(['/configurecompany', this.company.companyId], {
    // //   queryParams: { searchTerm: this.searchTerm}
    // // });
  }
  editCompany() {
    this._router.navigate(['/configurecompany', this.company.companyId]
    );
  }

  ngOnInit(): void {
  }

}


