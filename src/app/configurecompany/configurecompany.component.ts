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



const API_URL = AppConstants.Https_API_URL ;
const httpOptions =AppConstants.ApplicationHeaders;

@Component({
  selector: 'app-configurecompany',
  templateUrl: './configurecompany.component.html',
  styleUrls: ['./configurecompany.component.css']
})
export class ConfigurecompanyComponent implements OnInit {
  @ViewChild('myCompanyForm') public myCompanyForm!: NgForm
  panelTitle: string = 'Company Configuration';
  updateSuccess: boolean = false;
  companyInfo:ICompanyInfo ={
    companyId:null,
    companyName:null,
    tradeName:  null,
    companyVAT:  null,
    companyBusinessPhone:null,
    companyWebsite:null,
    companyEmail:  null,
    companyCountry:  null,
    companyAddress:  null,
    companyTown:null,
    companyState: null,
    companyPostCode:null,
    companyContactPerson:null,
    companyContactPhone:null,
    login:  localStorage.getItem('email')
  }

  constructor(
    private _httpClient: HttpClient
  , private _router: Router
  , private _errorService : ErrorService
  , private _renderer: Renderer2
  , private _cmpService: ConfigureCompanyService
  ){
    this._cmpService.getCompanyInfo(this.companyInfo).subscribe(
      (response) => {
        this.companyInfo = response;
        // if (this.accountInfo.firstLogin === false) {
        //   this.panelTitle = 'Modify Info About You';
        // }
        // this.isCompany = this.accountInfo.isCompany;
        // this.changeDivClasees()
        // this.changeDivCnfCompany();
      }
    ), (err: any) => console.log(err);


  }

  ngOnInit(): void {
  }
  saveCompanyInfo(){
    let id = Guid.create();
    const companyInfo: ICompanyInfo = Object.assign({}, this.companyInfo);
    this.companyInfo.companyId= '{' + id.toString() +'}';
    this._cmpService.saveCompanyInfo(companyInfo)?.subscribe(
      (data: any) => {
       // console.log("After company info update " + data.message + " " + data.statusCode)
        if(data.statusCode==201)
        {
          this.updateSuccess=true;
        }
      },
      (error: any) => console.log(error)
    );
  }
  closeUpdateSuccess(){

  }
  CloseForm(){

  }
}
