import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IEmployee } from '../Modules/employee.model';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  private _employeeId: number;
  selectedEmployeeId: number | undefined;
  
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete:boolean=false;
 
  @Input() searchTerm!:string;
  @Input()
  set employeeId(val: number) {
    console.log("EmployeeID changed from " + JSON.stringify(this.employeeId) + ' to ' + JSON.stringify(val));
    this._employeeId = val;
  }
  get employeeId(): number { return this._employeeId; }


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
    return this.employee.fullName + ' ' + this.employee.gender;
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

  constructor(private _route: ActivatedRoute, private _empService : EmployeeService,
    private _router: Router, ) {
    this._employeeId = 0;

  }
  deleteEmployee(){
    this._empService.delete(this.employee.id!).subscribe(
      ()=> console.log(`Employee with Id = ${this.employee.id} deleted.`),
      (err) => console.log()
    );


    this.notifyDelete.emit(this.employee.id!);
  }


  ngOnInit(): void {
    this.selectedEmployeeId = + (this._route.snapshot.paramMap.get('id') || '0');
    console.log("_selectedEmployeeId : " + this.selectedEmployeeId);
  }

  editEmployee(){
    this._router.navigate(['/edit', this.employee.id]
    );
  }
  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm}
    });
  }

}
