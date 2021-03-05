// https://www.youtube.com/watch?v=aP2hd4TePl4 display details 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from '../Modules/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: IEmployee | undefined;
  constructor(private _route : ActivatedRoute, 
              private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    const id = + this._route.snapshot.params['id'];
    console.log("Selected id: " + id);
    this.employee = this._employeeService.getEmployee(id);
  }

}
