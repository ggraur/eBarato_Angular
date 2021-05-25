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
    applicationUserId:null,
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
    private _cmpService: ConfigureCompanyService, private router: Router
  ) {
     this.ShowReg();
  }

  ngOnInit(): void {

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

        // }
      },
      (error: any) => console.log(error)
    );
  }
  ShowReg() {
    //this.companyInfo.CompanyName = "sdfgsdfgsdgf";
    this.companyInfo.login = localStorage.getItem('email');
    this._cmpService.getCompanyInfo(this.companyInfo).subscribe(
      (response ) => {
        //let v = JSON.parse( JSON.stringify( response));
       // console.log(response);
        this.companyInfo   = response;
        //this.myCompanyForm.setValue(this.companyInfo);
      }
    ), (err: any) => console.log(err);

  }
  closeUpdateSuccess() {

  }
  CloseForm() {
    this.router.navigate(['home']);
  }
}
