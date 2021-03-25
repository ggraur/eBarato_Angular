import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from 'src/app/Models/employee.model';
// import { EmployeeService } from './employee.service'


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  constructor(private _route: ActivatedRoute) {

    const resolvedData: IEmployee[] | string = this._route.snapshot.data.employeeList;

    // console.log("Resolved Data: " + (resolvedData));

    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      
      this.error = resolvedData!;
    }

    //      this.employees=this._route.snapshot.data['employeeList'];
    if (Array.isArray(this.employees)) {
      if (this._route.snapshot.queryParamMap.has('searchTerm')) {
        this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm') || '';
      } else {
        this.filteredEmployees = this.employees;
        // console.log('filteredEmployees : ' + new Date().toTimeString());
      }
      // this.employeeId = 0;

      this.employeeToDisplay = this.employees[0];
      this.empCount = this.employees.length;
      console.log('Total number of employees: ' + this.empCount);
    }
  }
  // dataFromChild: IEmployee | undefined;

  private _searchTerm!: string;
  public error!: string;
  errorMsg!: string;
  employeeId!: number | null;
  employees!: IEmployee[];
  filteredEmployees!: IEmployee[];
  employeeToDisplay!: IEmployee;
  private empCount = -1;
  private indexArray = 1;
  filterEmployees(searchString: string) {
    return this.employees.filter(
      employee => employee.fullName?.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  onDeleteNotification(id: number) {
    const deleteId = this.filteredEmployees.findIndex(e => e.id == id);
    if (deleteId !== -1) {
      this.filteredEmployees.splice(deleteId, 1);
    }
  }

  ngOnInit(): void {
    // this._employeeService.getEmployees().subscribe((empList) => {
    //   this.employees = empList;
    //   //console.log('Subscribe : ' + new Date().toTimeString());


    //   //this.filteredEmployees = Object.assign([],this.employees);


    //   // console.log(this._route.snapshot.queryParamMap.has('searchTerm'));
    //   // console.log(this._route.snapshot.queryParamMap.get('searchTerm'));
    //   // console.log(this._route.snapshot.queryParamMap.getAll('searchTerm'));
    //   // console.log(this._route.snapshot.paramMap.keys);



    // });

  }
  // prevEmployee(): void {
  //   if (this.indexArray == 1) {
  //     this.employeeToDisplay = this.employees[this.empCount - 1];
  //     this.indexArray = this.empCount;
  //   }
  //   else {
  //     this.indexArray--;
  //     this.employeeToDisplay = this.employees[this.indexArray - 1];
  //   }
  // }
  // nextEmployee(): void {
  //   if (this.indexArray < this.empCount) {
  //     this.employeeToDisplay = this.employees[this.indexArray];
  //     this.indexArray++;
  //   }
  //   else {
  //     this.employeeToDisplay = this.employees[0];
  //     this.indexArray = 1;
  //   }
  // }
  // displayEmployee(employeeId: number | null) {
  //   this._router.navigate(['/employees', employeeId], {
  //     queryParams: {
  //       'searchTerm': this.searchTerm, 'testParam': 'testValue'
  //     }
  //   });
  // }
  // handleNotify(eventData: IEmployee) {
  //   this.dataFromChild = eventData;
  // }

  // changeEmployeeName() {

  //   this.employees[0].fullName = 'Jordan';
  //   this.filteredEmployees = this.filterEmployees(this.searchTerm);

  //   // // pure pipe to filter data
  //   // const newEmployeeArray: IEmployee[] = Object.assign([],this.employees);
  //   // newEmployeeArray[0].fullName='Jordan';
  //   // this.employees=newEmployeeArray;

  // }

  // onMouseMove() {

  // }
}
