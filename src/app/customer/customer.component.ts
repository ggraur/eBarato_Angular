import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app.constant';

const AUTH_API = AppConstants.Https_API_URL;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: any;

  constructor(private http: HttpClient) { }
// https://www.youtube.com/watch?v=NSQHiIAP7Z8
  ngOnInit(): void {
    const _url = AUTH_API + 'customers';
    console.log('Customers1 URL: ' + _url);
    this.http.get(_url).subscribe(response => {
      this.customers = response;
      console.log('Customers list: ' + JSON.stringify(this.customers));
    }, err => {
      console.log(err);
    });
  }

}
