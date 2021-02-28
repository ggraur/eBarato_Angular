import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Modules/employee.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[] = [
    {
      id: 1,
      fullName: 'Mark',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date('10/25/1988'),
      department: 'IT',
      isActive: true,
      photoPath: '../assets/Images/1.png'
    },
    {
      id: 2,
      fullName: 'Mary',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 2345978640,
      dateOfBirth: new Date('11/20/1979'),
      department: 'HR',
      isActive: false,
      photoPath: '../assets/Images/3.jfif'
    },
    {
      id: 3,
      fullName: 'John',
      gender: 'Male',
      contactPreference: 'Phone',
      phoneNumber: 5432978640,
      dateOfBirth: new Date('3/25/1976'),
      department: 'IT',
      isActive: false,
      photoPath: '../assets/Images/2.jfif'
    },
    {
      id: 4,
      fullName: 'Annete',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 5432978642,
      dateOfBirth: new Date('4/22/1974'),
      department: 'IT',
      isActive: true,
      photoPath: '../assets/Images/4.jfif'
    },
    {
      id: 5,
      fullName: 'Anton',
      gender: 'Male',
      contactPreference: 'Phone',
      phoneNumber: 5432978641,
      dateOfBirth: new Date('5/22/1975'),
      department: 'IT',
      isActive: false,
      photoPath: '../assets/Images/5.jfif'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
