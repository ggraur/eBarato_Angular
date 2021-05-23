import { Component, Injectable, Renderer2, ViewChild } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, delay, takeUntil, catchError } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../app.constant';
import { ErrorService } from '../_services/error.service';
import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    private _cmpService: ConfigureCompanyService
  ) {
    if (this.companyInfo.Login != null) {
      this._cmpService.getCompanyInfo(this.companyInfo).subscribe(
        (response) => {
          this.companyInfo = response;
          if (this.companyInfo.CompanyVAT != "" || !null) {
            this.panelTitle = 'Modify Company Info';
          }
        }
      ), (err: any) => console.log(err);
    }
  }

  ngOnInit(): void {
  }
  saveCompanyInfo() {
    let id = Guid.create();
    const companyInfo: ICompanyInfo = Object.assign({}, this.companyInfo);
    this.companyInfo.CompanyId = '{' + id.toString() + '}';
    this._cmpService.saveCompanyInfo(companyInfo)?.subscribe(
      (data: any) => {
        // console.log("After company info update " + data.message + " " + data.statusCode)
        if (data.statusCode == 201) {
          this.updateSuccess = true;
        }
      },
      (error: any) => console.log(error)
    );
  }
  ShowReg() {
    let str = {"Login":"indo23md@gmail.com","CompanyId":"{6e7db843-ba8d-4197-bad2-52298f986e8d}","ApplicationUserId":"95d549c8-276c-4e55-935e-741222904f44","CompanyName":"Alegria Partilhada Lda1","TradeName":"eBarato","CompanyVAT":"514279699","CompanyBusinessPhone":"\u002B351969309119","CompanyWebsite":"ebarato.pt","CompanyEmail":"superadmin@ebarato.pt","CompanyCountry":"Portugal","CompanyAddress":"Rua Federigo George 29 b r/c","CompanyTown":"Lisboa","CompanyState":"Lisboa","CompanyPostCode":"1600-492","CompanyContactPerson":"Gheorghe Graur","CompanyContactPhone":"\u002B35196909119"}
  
    this.companyInfo.Login = localStorage.getItem('email');
    console.log(this.companyInfo.Login);

    this._cmpService.getCompanyInfo(this.companyInfo).subscribe(
      (response) => {
        this.companyInfo = response;
        // console.log(response);
        // this.companyInfo = response;
        // this.myCompanyForm.setValue(response);// = response;
        // if (this.companyInfo.CompanyVAT != "" || !null) {
        //   this.panelTitle = 'Modify Company Info';
        // }
      }
    ), (err: any) => console.log(err);

  }
  closeUpdateSuccess() {
  }
  CloseForm() {
  }
}
