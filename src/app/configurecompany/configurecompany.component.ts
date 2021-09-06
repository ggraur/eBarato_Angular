import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ICompanyInfo } from '../Models/company.model';

import { Guid } from 'guid-typescript';
import { CompanyService } from './company.service';
import { NotifierService } from 'angular-notifier';


// const API_URL = AppConstants.Https_API_URL;
// const httpOptions = AppConstants.ApplicationHeaders;

@Component({
  selector: 'app-configurecompany',
  templateUrl: './configurecompany.component.html',
  styleUrls: ['./configurecompany.component.css']
})

export class ConfigurecompanyComponent implements OnInit {
  private _cmpId: string | null | undefined;
  private readonly notifier:NotifierService;

  set mCompany(value: ICompanyInfo) {
    this.companyInfo = value;
  }

  @ViewChild('myCompanyForm') public myCompanyForm!: NgForm

  panelTitle: string  = 'Company Configuration';
 

  updateSuccess: boolean = false;

  companiesList!: ICompanyInfo[];

  companyInfo: ICompanyInfo = {
    applicationUserId: null,
    login: localStorage.getItem('email'),
    companyId: null,
    companyName: null,
    tradeName: null,
    companyVAT: null,
    companyBusinessPhone: null,
    companyWebsite: null,
    companyEmail: null,
    companyCountry: null,
    companyAddress: null,
    companyTown: null,
    companyState: null,
    companyPostCode: null,
    companyContactPerson: null,
    companyContactPhone: null
  };

  constructor(
    private _cmpService: CompanyService, private _route: ActivatedRoute, private router: Router, private notifierService:NotifierService
  ) {
    //this.ShowReg();
    this.notifier= notifierService;
  }

  ngOnInit(): void {

    //console.log('Company passed as parameter:' +this.mCompany)
    //this._cmpId = this.myCompany.companyId

    //this._route.snapshot.params.myCompany.companyId;

    //console.log('Selected company id : ' + this._cmpId);
    let tmpCmp: string | null = null;
    this._route.paramMap.subscribe(parameterMap => {
      tmpCmp = (parameterMap.get('companyId') || null);
      // console.log('const tmpCmp:' + tmpCmp);
      this.getCompany(tmpCmp);
    });


    // if ( tmpCmp ===null ) {
    //   // this.companyInfo.companyId = this._cmpId;
    //   // this._cmpService.getCompanyInfo(this.companyInfo).subscribe(
    //   //   (response) => {
    //   //     //let v = JSON.parse( JSON.stringify( response));
    //   //     // console.log(response);
    //   //     this.companyInfo = response;
    //   //     //this.myCompanyForm.setValue(this.companyInfo);
    //   //   }
    //   // ), (err: any) => console.log(err);
    // }
  }
  getCompany(cmpId: string | null) {
    if (cmpId === "") {
      this.companyInfo = {
        applicationUserId: null,
        login: localStorage.getItem('email'),
        companyId: null,
        companyName: null,
        tradeName: null,
        companyVAT: null,
        companyBusinessPhone: null,
        companyWebsite: null,
        companyEmail: null,
        companyCountry: null,
        companyAddress: null,
        companyTown: null,
        companyState: null,
        companyPostCode: null,
        companyContactPerson: null,
        companyContactPhone: null
      };
      // this.createEmployeeForm.reset();
      this.panelTitle = 'Create New Company';
    }
    else {
      // this.employee =Object.assign({}, this._employeeService.getEmployee(id)!);
      this._cmpService.getCompanyInfoByCompanyID1(cmpId).subscribe(
        (cmp) =>
          this.companyInfo = cmp
      ),
        (err: any) => console.log(err);
       this.panelTitle = 'Modify company';
 
    }

  }
  saveCompanyInfo() {
    let id = Guid.create();
    const _companyInfo: ICompanyInfo = Object.assign({}, this.companyInfo);
    this.companyInfo.companyId = '{' + id.toString() + '}';
    this._cmpService.saveCompanyInfo(_companyInfo)?.subscribe(
      (data: any) => {
        // if (data.statusCode == 201) {
        this.companyInfo = data;
        //this.companyInfo.CompanyName="asdfsdfsdfas"
        this.updateSuccess = true;

        this.notifier.notify('success', 'You are awesome! I mean it!');

        // }
      },
      (error: any) => console.log(error)
    );
  }
  ShowReg() {

    this.companyInfo.login = localStorage.getItem('email');
    // this._cmpService.getCompanyInfo(this.companyInfo).subscribe(
    //   (response ) => {
    //     //let v = JSON.parse( JSON.stringify( response));
    //    // console.log(response);
    //     this.companyInfo   = response;
    //     //this.myCompanyForm.setValue(this.companyInfo);
    //   }
    // ), (err: any) => console.log(err);

    this._cmpService.getCompaniesInfo(this.companyInfo).subscribe(
      (response) => {
        this.companiesList = response;
        if (this.companiesList.length > 1) {
          this.router.navigate(['companieslist']);
        } else if (this.companiesList.length <= 1) {
          this.router.navigate(['configurecompany']);
        };
        //console.log('Companies list count: ' + this.companiesList.length);
      }
    ), (err: any) => console.log(err);

  }
  closeUpdateSuccess() {
     this.router.navigate(['companieslist']);
     this.ngOnInit();
   }
  CloseForm() {
    this.router.navigate(['companieslist']);
    this.ngOnInit();

  }
}
