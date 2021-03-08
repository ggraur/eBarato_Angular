import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { IEmployee } from '../Modules/employee.model';
import { Department } from '../Modules/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm!: NgForm;
  panelTitle!:string;
  previewPhoto = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: IEmployee= {
    id: null,
    fullName: null,
    gender: null,
    contactPreference: null,
    phoneNumber: null,
    email: null,
    dateOfBirth: null,
    department: null,
    isActive: null,
    photoPath: null,
    password: null,
    confirmPassword: null,
  };
  departments: Department[] = [
    { id: -1, name: '-- Select Department --' },
    { id: 1, name: 'Help Desk-' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
  ];

  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) {
    // this.employee.contactPreference="phone";
    // this.employee.gender="male";
    // this.employee.isActive=true;
    this.employee.department = '-1';
    // this.employee.email="test@mail.com"
    // this.employee.dateOfBirth =new Date(2000,0,1);
    this.employee.photoPath = 'assets/Images/noImage.jfif';
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +(parameterMap.get('id') || 0);
      this.getEmployee(id);
    })
  }
  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        fullName: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: null,
        dateOfBirth: null,
        department: null,
        isActive: null,
        photoPath: null,
        password: null,
        confirmPassword: null,
      };
      this.panelTitle = 'Create New Employee';
      this.createEmployeeForm.reset();
    }
    else {
      this.employee =Object.assign({}, this._employeeService.getEmployee(id)!);
      this.panelTitle = 'Modify Employee: ' + this.employee.fullName;
    }
  }
  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }
  saveEmployee(): void {
    //console.log(this.employee);
    const newEmployee: IEmployee = Object.assign({}, this.employee);// https://www.youtube.com/watch?v=KNI66wZcaf8, explaining that line
    this._employeeService.save(newEmployee);
    // reseting form 
    this.createEmployeeForm.reset();
    this._router.navigate(['list']);
  }

}

// https://www.youtube.com/watch?v=pwQ3L3UFEjk&t=803s
// angular forms tutorial

// https://www.youtube.com/watch?v=HMK4P_jx0y8 -- dropdownlist

