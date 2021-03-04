import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/Modules/employee.model';
import { EmployeeService } from './employee.service'


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: IEmployee[];

  constructor(private _employeeService:EmployeeService) { 
    this.employees=this._employeeService.getEmployee();
  }

  ngOnInit(): void {
    this.employees=this._employeeService.getEmployee();
  }

}
