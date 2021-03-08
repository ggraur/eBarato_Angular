import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';
import { IEmployee } from "../Modules/employee.model";

@Injectable()
export class EmployeeService {
  private listEmployees: IEmployee[] = [
    {
      id: 1,
      fullName: 'Mark, 1',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date('10/25/1988'),
      department: '3',
      isActive: true,
      photoPath: '../assets/Images/1.png',
      password: '',
      confirmPassword: '',
      phoneNumber: 2345978640
    },
    {
      id: 2,
      fullName: 'Mary, 2',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 2345978640,
      dateOfBirth: new Date('11/20/1979'),
      department: '2',
      isActive: false,
      photoPath: '../assets/Images/3.jfif',
      password: '',
      confirmPassword: '',
    },
    {
      id: 3,
      fullName: 'John, 3',
      gender: 'Male',
      contactPreference: 'Email',
      phoneNumber: 5432978640,
      dateOfBirth: new Date('3/25/1976'),
      department: '3',
      isActive: false,
      photoPath: '../assets/Images/2.jfif',
      password: '',
      confirmPassword: '',
    },
    {
      id: 4,
      fullName: 'Annete, 4',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 5432978642,
      dateOfBirth: new Date('4/22/1974'),
      department: '3',
      isActive: true,
      photoPath: '../assets/Images/4.jfif',
      password: '',
      confirmPassword: '',

    },
    {
      id: 5,
      fullName: 'Anton,5 ',
      gender: 'Male',
      contactPreference: 'Post',
      phoneNumber: 5432978641,
      dateOfBirth: new Date('5/22/1975'),
      department: '3',
      isActive: false,
      photoPath: '../assets/Images/5.jfif',
      password: '',
      confirmPassword: '',
    },
  ];

  getEmployees(): Observable<IEmployee[]> {
    // return of(this.listEmployees).pipe(delay(2000));
    return of(this.listEmployees);
  }
  getEmployeesCount(): number {
    return this.listEmployees.length;
  }
  getEmployee(employeeId: number): IEmployee | undefined {
    return this.listEmployees.find(x => x.id === employeeId);
  }

  delete(id: number) {
    const deleteId = this.listEmployees.findIndex(e => e.id == id);
    if (deleteId !== -1) {
      this.listEmployees.splice(deleteId, 1)
    }
  }
  save(employee: IEmployee) {
    if (employee.id == null) {
      const maxId = this.listEmployees.reduce(function (e1, e2) {
        return ((e1.id!) > (e2.id!)) ? e1 : e2;
      }).id;
      employee.id = maxId! + 1;
      this.listEmployees.push(employee);
    } else {
      const foundIndex = +this.listEmployees.findIndex(e => e.id === employee.id);
      this.listEmployees[foundIndex] = employee;
    }

  }

}