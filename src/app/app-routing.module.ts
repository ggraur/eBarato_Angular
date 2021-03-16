import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';

import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { EmployeesComponent } from './employees/employees.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { HomeComponent } from './home/home.component';
import { CreateMerchantComponent } from './merchant/create-merchant.component';
import { ListMerchantsComponent } from './merchant/list-merchants.component';
import { MerchantListResolverService } from './merchant/MerchantListResolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'list', component: ListEmployeesComponent, resolve: {employeeList: EmployeeListResolverService}},
  {path: 'editEmployee/:id', component: CreateEmployeeComponent, canDeactivate: [CreateEmployeeCanDeactivateGuardService]},
  {path: 'employees/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeDetailsGuardService]},
  
  {path: 'merchants', component: ListMerchantsComponent, resolve: {merchantList: MerchantListResolverService}},
  {path: 'editMerchant/:id', component: CreateMerchantComponent
   // ,    canDeactivate:[CreateEmployeeCanDeactivateGuardService]
  },

  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path: 'notFound', component: PageNotFoundComponent},

  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
