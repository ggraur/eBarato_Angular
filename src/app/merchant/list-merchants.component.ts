import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMerchant } from '../Modules/merchant.model';

@Component({
  selector: 'app-list-merchants',
  templateUrl: './list-merchants.component.html',
  styleUrls: ['./list-merchants.component.css']
})
export class ListMerchantsComponent implements OnInit {
  
  filteredMerchants!: IMerchant[];
  merchants!: IMerchant[];
  private _searchTerm!: string;

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredMerchants = this.filterMerchants(value);
  }
  
  filterMerchants(searchString: string) {
    return this.merchants.filter(
      merchant => merchant.repFullName?.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private _router: Router
             ,private _route: ActivatedRoute) {


     }

  ngOnInit(): void {
  }
  onDeleteNotification(id: number) {
    const deleteId = this.filteredMerchants.findIndex(e => e.id == id);
    if (deleteId !== -1) {
      this.filteredMerchants.splice(deleteId, 1);
    }
  }
}
