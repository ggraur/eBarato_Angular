import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ICompanyInfo } from '../Models/company.model';
import { ConfigureCompanyService } from './configurecompany.service';
import { Guid } from 'guid-typescript';



// const API_URL = AppConstants.Https_API_URL;
// const httpOptions = AppConstants.ApplicationHeaders;

@Component({
  selector: 'app-configurecompany',
  templateUrl: './configurecompany.component.html',
  styleUrls: ['./configurecompany.component.css']
})

export class ConfigurecompanyComponent implements OnInit {

  @ViewChild('myCompanyForm') public myCompanyForm!: NgForm
  panelTitle: string = 'Company Configuration';
  updateSuccess: boolean = false;

  companyInfo: ICompanyInfo = {
    Login: localStorage.getItem('email'),
    CompanyId: null,
    CompanyName: null,
    TradeName: null,
    CompanyVAT: null,
    CompanyBusinessPhone: null,
    CompanyWebsite: null,
    CompanyEmail: null,
    CompanyCountry: null,
    CompanyAddress: null,
    CompanyTown: null,
    CompanyState: null,
    CompanyPostCode: null,
    CompanyContactPerson: null,
    CompanyContactPhone: null
  };

  constructor(
    private _cmpService: ConfigureCompanyService, private router: Router
  ) {
    // if (this.companyInfo.Login != null) {
    //   this._cmpService.getCompanyInfo(this.companyInfo).subscribe(
    //     (response) => {
    //       if (response.CompanyId != undefined) {
    //         this.companyInfo = response;
    //         console.log(response);
    //         console.log(response.CompanyAddress);

    //         // let tmpCmp!: ICompanyInfo ;
    //         // tmpCmp.CompanyAddress = response.CompanyAddress;



    //         console.log(response);
    //         if (this.companyInfo.CompanyVAT != "" || !null) {
    //           this.panelTitle = 'Modify Company Info';
    //         }
    //       }

    //     }
    //   ), (err: any) => console.log(err);
    // }
  }

  ngOnInit(): void {
    this.ShowReg();
  }
  saveCompanyInfo() {
    let id = Guid.create();
    const _companyInfo: ICompanyInfo = Object.assign({}, this.companyInfo);
    this.companyInfo.CompanyId = '{' + id.toString() + '}';
    this._cmpService.saveCompanyInfo(_companyInfo)?.subscribe(
      (data: any) => {
        // if (data.statusCode == 201) {
        this.companyInfo = data;
        this.updateSuccess = true;

        // }
      },
      (error: any) => console.log(error)
    );
  }
  ShowReg() {
    this.companyInfo.Login = localStorage.getItem('email');
    this._cmpService.getCompanyInfo(this.companyInfo).subscribe(
      (response) => {
        this.companyInfo  = response;
        this.myCompanyForm.setValue(this.companyInfo);
      }
    ), (err: any) => console.log(err);

  }
  closeUpdateSuccess() {
  }
  CloseForm() {
  }
}
