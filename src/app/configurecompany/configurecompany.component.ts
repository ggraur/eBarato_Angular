import { Component, Injectable, ViewChild } from '@angular/core';
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
    companyContactPhone:null
  }
  constructor(
    private _httpClient: HttpClient
  , private _router: Router
  , private _errorService : ErrorService){

  }

  ngOnInit(): void {
  }
  saveCompanyInfo(){

  }
  closeUpdateSuccess(){

  }
  CloseForm(){
    
  }
}
