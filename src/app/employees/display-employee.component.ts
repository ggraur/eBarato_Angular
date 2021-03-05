import { Component, Input,  OnInit } from '@angular/core';
import { IEmployee } from '../Modules/employee.model';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  private _employeeId:number ;
  @Input() 
  set employeeId (val:number ){ 
    console.log("EmployeeID changed from " + JSON.stringify(this.employeeId) + ' to ' + JSON.stringify(val));
    this._employeeId = val;
   }
  get employeeId():number { return this._employeeId;}


  private _employee!: IEmployee;

  @Input()
  set employee(val: IEmployee) {
    // console.log('Previous : ' + (this._employee ? this._employee.fullName : 'NULL'));
    // console.log('Current : ' + val.fullName );
    this._employee = val;
  }

  // @Output() notify: EventEmitter<IEmployee> = new EventEmitter<IEmployee>();

  get employee(): IEmployee {
    return this._employee;
  }

  getEmployeeNameAndGender(): string {
    return this.employee.fullName + ' ' +this.employee.gender;
  }
  // handleClick(){
  //   this.notify.emit(this.employee ? this.employee  : undefined);
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   for (const propName of Object.keys(changes)) {
  //     // console.log(propName);
  //      const change = changes[propName];
  //      const from = JSON.stringify(change.previousValue);
  //      const to = JSON.stringify(change.currentValue);
  //      console.log(propName + ' changed from ' + from + ' to ' + to);
  //   }
  // }

  constructor() {
    this._employeeId=0;
   
   }

  ngOnInit(): void {
  }


}
