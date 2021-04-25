import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { IAccountInfo } from '../Models/accountinfo.model';
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
  accountInfo: IAccountInfo = {
    email: localStorage.getItem('email'),
    firstName: null,
    lastName: null,
    phoneNumber: null,
    isCompany: false,
    firstLogin: false,
    success: false
  };

  constructor(private accountInfoService: AccountInfoService, private router: Router, private renderer: Renderer2) {
    //2
    if (this.accountInfo.email != null) {
      this.accountInfoService.firstLogin(this.accountInfo).subscribe(
        (response) => {
          this.accountInfo = response
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
  checkClick(){
    let myDiv = document.getElementsByName('divWell')
    console.log(myDiv);
    myDiv.forEach(element => {
      if (element.classList) {
        if (!this.isCompany) {
          element.classList.remove('hidden');
        }else
        {
          element.classList.add('hidden');
        }
      }
     //  element.classList.add('hidden');
      //console.log(element)
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
        this.changeDivClasees();
        this.changeDivCnfCompany();
      },
      (error: any) => console.log(error)
    );
  }

  changeDivCnfCompany(){
    //
    let myDiv = document.getElementsByName('divBtnCnfCompany')
    myDiv.forEach(element => {
      if (element.classList) {
        if (!this.isCompany) {
          element.classList.add('hidden');
        }else
        {
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
        //console.log(element)
      });
   
  }
}


