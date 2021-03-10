import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent implements OnInit {

  constructor() { }

  @Input() msg!:string;

  ngOnInit(): void {
  }

}
