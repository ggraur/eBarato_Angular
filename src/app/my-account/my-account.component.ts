import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { IAccountInfo } from '../Models/accountinfo.model';
import { TokenStorageService } from '../_services/token-storage.service';
import { AccountInfoService } from './my-account.service';

const firstTime: boolean = true;


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})

export class MyAccountComponent implements OnInit {

  // 1
  @ViewChild('myAccountForm') public myAccountForm!: NgForm
  panelTitle: string = 'Say little more about you';
  divHideClassesToApply: string = 'disableDiv';
  divHideClassesToRemove: string = '';
  updateSuccess: boolean = false;
  isCompany: boolean = false;
  errorMsg!: string;
  public error!: string;

  filteredCompanies!: IAccountInfo[];
  

  counter: { min: number; sec: number; } = { min: 0, sec: 0 };

  accountInfo: IAccountInfo = {
    email: localStorage.getItem('email'),
    firstName: null,
    lastName: null,
    phoneNumber: null,
    isCompany: false,
    firstLogin: false,
    success: false
  };

  constructor(private accountInfoService: AccountInfoService, 
    private router: Router, 
        private tokenStorageService: TokenStorageService) {
    //2
    if (this.accountInfo.email != null) {
      this.accountInfoService.firstLogin(this.accountInfo).subscribe(
        (response) => {
          this.accountInfo = response;
          console.log(response);
          if (this.accountInfo.firstLogin === false) {
            this.panelTitle = 'Modify Info About You';
          }
          this.isCompany = this.accountInfo.isCompany;
          this.changeDivClasees()
          this.changeDivCnfCompany();
        }
      ), (err: any) => console.log(err);
    }
  }

  ngOnInit(): void {
    //3

  }
  checkClick() {
    let myDiv = document.getElementsByName('divWell')
    console.log(myDiv);
    myDiv.forEach(element => {
      if (element.classList) {
        if (!this.isCompany) {
          element.classList.remove('hidden');
        } else {
          element.classList.add('hidden');
        }
      }

    });
  }

  getAccountInfo() {
    const tmpemail: IAccountInfo = Object.assign({}, this.accountInfo);

    this.accountInfoService.getAccountInfo(tmpemail).subscribe(
      (data) => {
        this.accountInfo = data
      },
      (err: any) => console.log(err)
    );
  }
  onAgeChange() {

  }
  CloseForm() {
    this.router.navigate(['home']);
  }
 
  ConfigureCompany() {
    this.router.navigate(['merchant']);
  }
  closeUpdateSuccess() {
    this.updateSuccess = false;

  }
  saveAccountInfo() {
    const accountInfo: IAccountInfo = Object.assign({}, this.accountInfo);
    this.accountInfoService.saveAccountInfo(accountInfo)?.subscribe(
      (data: any) => {
        // console.log("After account info update " + data.message + " " + data.value)
        this.accountInfo = data;
        this.updateSuccess = this.accountInfo.success;
        this.panelTitle = 'Modify Info About You';
        this.isCompany = this.accountInfo.isCompany;
        this.startRedirect();
        this.tokenStorageService.updateIsCompany(this.isCompany);
      },
      (error: any) => console.log(error)
    );
  }

  startRedirect(){
    this.changeDivClasees();
    this.changeDivCnfCompany();
    this.startTimer(0, 2, true, "companieslist");
  }

  changeDivCnfCompany() {
    //
    let myDiv = document.getElementsByName('divBtnCnfCompany')
    myDiv.forEach(element => {
      if (element.classList) {
        if (!this.isCompany) {
          element.classList.add('hidden');
        } else {
          element.classList.remove('hidden');
        }
      }
      //console.log(element)
    });
  }

  changeDivClasees() {
    let myDiv = document.getElementsByName('divCheckBox')
    myDiv.forEach(element => {
      if (element.classList) {
        if (this.isCompany) {
          element.classList.add(this.divHideClassesToApply);
        }
      }
    });
  }

  startTimer(min: number, sec: number, redirect: boolean, redirectUrl: string) {
    this.counter = { min: min, sec: sec }
    let intervalId = setInterval(() => {
      if (this.counter.sec - 1 == -1) {
        this.counter.min -= 1;
        this.counter.sec = 59
      }
      else this.counter.sec -= 1
      if (this.counter.min === 0 && this.counter.sec == 0) {
        if (redirect) {
          this.router.navigate([redirectUrl]);
        }
        clearInterval(intervalId)
      }
    }, 1000)
  }
}


