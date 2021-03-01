import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../Modules/employee.model';
import { Department } from '../Modules/department.model';


@Component({
  selector: 'create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  departments: Department[]=[
    {id:0, name : "-- Select Department --"},
    {id:1, name : "Help Desk-"},
    {id:2, name : "HR"},
    {id:3, name : "IT"},
    {id:4, name : "Payroll"},
  ];
  employee: Employee = new Employee;
 
  constructor() {
    this.employee.contactPreference="phone";
    this.employee.gender="male";
    this.employee.isActive=true;
    this.employee.department='0';
  }

  ngOnInit(): void {
    
  }

  saveEmployee(empForm: NgForm): void {
    console.log(empForm.value);
  }

}

// https://www.youtube.com/watch?v=pwQ3L3UFEjk&t=803s
// angular forms tutorial

// https://www.youtube.com/watch?v=HMK4P_jx0y8 -- dropdownlist