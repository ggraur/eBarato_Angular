import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input,   EventEmitter, Output } from '@angular/core';
import { ICountry } from '../Models/country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit {

  countries!: ICountry[];

  @Input('cntryCode') cntryCode!: string;
  @Output() notifyOnChangeCountry: EventEmitter<ICountry> = new EventEmitter<ICountry>();

  private _country!: ICountry;

  constructor(private httpService: HttpClient) {
  }

  selected() {
  //  console.log("child component emit: " +  JSON.stringify(this._country))
    this._country = this.countries.find(x => x.code == this.cntryCode)!;
    this.notifyOnChangeCountry.emit( this._country );
  }

  ngOnInit(): void {
    this.httpService.get('./assets/countries/countries.json').subscribe(
      data => {
        this.countries = data as ICountry[];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

}
