import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/Models/employee.model';
import { ICompanyInfo } from '../Models/company.model';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit {
  
  
  private _searchTerm!: string;
  private cmpCount = -1;

  public error!: string;
  
  deleteSuccess: boolean = false;

  companies!: ICompanyInfo[];
  filteredCompanies!: ICompanyInfo[];
  companyToDisplay!:ICompanyInfo;
  errorMsg!: string;
  

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredCompanies = this.filterCompanies(value);
  }

  filterCompanies(searchString: string) {
    return this.companies.filter(
      company => company.companyName?.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  
  onDeleteNotification(id: string ) {
    const deleteId = this.filteredCompanies.findIndex(e => e.companyId == id);
    if (deleteId !== -1) {
      this.deleteSuccess=true;
      this.filteredCompanies.splice(deleteId, 1);
    }
  }

  closeUpdateSuccess() {
    this.deleteSuccess = false;

  }

  constructor(private _route: ActivatedRoute, private _router: Router) { 
    
    const resolvedData: ICompanyInfo[] | string = this._route.snapshot.data.companiesList;
    if (Array.isArray(resolvedData)) {
      this.companies = resolvedData;
    } else {
      this.error = resolvedData!;
    }
       //      this.employees=this._route.snapshot.data['employeeList'];
      if (Array.isArray(this.companies)) {

        if (this._route.snapshot.queryParamMap.has('searchTerm')) {
          this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm') || '';
        } else {
          this.filteredCompanies = this.companies;
          // console.log('filteredEmployees : ' + new Date().toTimeString());
        }
        // this.employeeId = 0;
  
        if(this.companies.length===0){
          this._router.navigate(['configurecompany']);
        }
        this.companyToDisplay = this.companies[0];
        this.cmpCount = this.companies.length;
        //console.log('Total number of companies: ' + this.cmpCount);
      }
     
  }

  ngOnInit(): void {}

}
