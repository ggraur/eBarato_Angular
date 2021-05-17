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
    login:null
  }
  constructor(
    private _httpClient: HttpClient
  , private _router: Router
  , private _errorService : ErrorService
  ,  private renderer: Renderer2
  , private cmpService: ConfigureCompanyService
  ){

  }

  ngOnInit(): void {
  }
  saveCompanyInfo(){
    let id = Guid.create();
    const companyInfo: ICompanyInfo = Object.assign({}, this.companyInfo);
    this.companyInfo.companyId= '{' + id.toString() +'}';
    this.cmpService.saveCompanyInfo(companyInfo)?.subscribe(
      (data: any) => {
        console.log("After company info update " + data.message + " " + data.value)
      },
      (error: any) => console.log(error)
    );
  }
  closeUpdateSuccess(){

  }
  CloseForm(){

  }
}
