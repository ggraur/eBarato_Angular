import { Component, Input, OnInit } from '@angular/core';
import { IEmployee } from '../Modules/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  @Input() employee :IEmployee | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
