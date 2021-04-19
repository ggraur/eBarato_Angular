import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMerchant } from '../Models/merchant.model';

@Component({
  selector: 'app-list-merchants',
  templateUrl: './list-merchants.component.html',
  styleUrls: ['./list-merchants.component.css']
})
export class ListMerchantsComponent implements OnInit {

  public error!: string;

  filteredMerchants!: IMerchant[];
  merchants!: IMerchant[];
  private _searchTerm!: string;
  private merchCount = -1;
  merchantToDisplay!: IMerchant;

  errorMsg!: string;

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

  constructor(private _router: Router, private _route: ActivatedRoute) {

    const resolvedData: IMerchant[] | string = this._route.snapshot.data.merchantList;

    // console.log("Resolved Data: " + (resolvedData));

    if (Array.isArray(resolvedData)) {
      this.merchants = resolvedData;
    } else {
      // console.log('merchant I\'m passing here');
      this.error = resolvedData!;
    }

    if (Array.isArray(this.merchants)) {
      if (this._route.snapshot.queryParamMap.has('searchTerm')) {
        this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm') || '';
      } else {
        this.filteredMerchants = this.merchants;
      }
      this.merchantToDisplay = this.merchants[0];
      this.merchCount = this.merchants.length;
      console.log('Total number of merchants: ' + this.merchCount);
    }
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
