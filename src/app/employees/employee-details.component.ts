// https://www.youtube.com/watch?v=aP2hd4TePl4 display details
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../Modules/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  private _id: number | undefined;
  private _employeesCount!: number;
  employee: IEmployee | undefined;
  constructor(private _route: ActivatedRoute,
              private _employeeService: EmployeeService,
              private _router: Router) { }

  ngOnInit(): void {

    this._id = + this._route.snapshot.params.id;
    // console.log("Selected id: " + id);
    // this.employee = this._employeeService.getEmployee(this._id);
    this._employeeService.getEmployee(this._id).subscribe(
      (employee) => this.employee = employee,
      (err: any) => console.log(err)
    );

    this._employeesCount = this._employeeService.getEmployeesCount();

    //   this._route.paramMap.subscribe(param=>{
    //   this._id = + !param.get('id');
    //  // this._id = + !param.get('id') ;
    //   console.log("Id is: " + this._id);
    //   //this._id = + param.get('id') ;
    //   this.employee = this._employeeService.getEmployee(this._id);
    //   this._employeesCount = this._employeeService.getEmployeesCount();
    // https://www.youtube.com/watch?v=jZJY70PY10w --not working for me
    // })



    // this._id = + this._route.snapshot.params['id'];
    // // console.log("Selected id: " + id);
    // this.employee = this._employeeService.getEmployee(this._id);
    // this._employeesCount = this._employeeService.getEmployeesCount();
  }
  viewNextEmployee() {
    const id = this._id ? this._id : 0;
    if (this._employeesCount - 1 < id) { this._id = 0; }
    this._id = id + 1;
    this._router.navigate(['/employees', this._id]);
  }

}
