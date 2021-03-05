import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/Modules/employee.model';
import { EmployeeService } from './employee.service'


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  // dataFromChild: IEmployee | undefined;
  employeeId!: number | null;
  employees!: IEmployee[];
  employeeToDisplay!: IEmployee;
  private empCount = -1;
  private indexArray = 1;

  constructor(private _employeeService: EmployeeService, private _router:Router) {
    this.employeeId = 0;
  }

  ngOnInit(): void {
    this.employees = this._employeeService.getEmployees();
    this.employeeToDisplay = this.employees[0];
    this.empCount = this.employees.length;
    console.log("Total number of employees: " + this.empCount);
  }
  prevEmployee(): void {
    if (this.indexArray == 1) {
      this.employeeToDisplay = this.employees[this.empCount - 1];
      this.indexArray = this.empCount;
    }
    else {
      this.indexArray--;
      this.employeeToDisplay = this.employees[this.indexArray - 1];
    }
  }
  nextEmployee(): void {
    if (this.indexArray < this.empCount) {
      this.employeeToDisplay = this.employees[this.indexArray];
      this.indexArray++;
    }
    else {
      this.employeeToDisplay = this.employees[0];
      this.indexArray = 1;
    }
  }
  displayEmployee(employeeId:number | null ){
      this._router.navigate(['/employees',employeeId]);
  }
  // handleNotify(eventData: IEmployee) {
  //   this.dataFromChild = eventData;
  // }
}
