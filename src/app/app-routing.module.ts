import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';

import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
// import { EmployeesComponent } from './employees/employees.component';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { HomeComponent } from './home/home.component';
import { CreateMerchantComponent } from './merchant/create-merchant.component';
import { ListMerchantsComponent } from './merchant/list-merchants.component';
import { MerchantListResolverService } from './merchant/MerchantListResolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { RegisterComponent } from './register/register.component';
// import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ActivateAccountComponent } from './activate_account/activate-account.component';
import { MyloginComponent } from './mylogin/mylogin.component';
import { AuthGuard } from './guards/auth-guard.service';
import { CustomerComponent } from './customer/customer.component';
import { UserComponent } from './user/user.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ConfigurecompanyComponent } from './configurecompany/configurecompany.component';
import { ListCompaniesComponent } from './configurecompany/list-companies.component';
import { CompanyListResolverService } from './configurecompany/company-list-resolver.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path:'configurecompany',component: ConfigurecompanyComponent},
  { path: 'companieslist', component: ListCompaniesComponent, resolve: {companiesList: CompanyListResolverService}, canActivate: [AuthGuard]},

  //{ path: 'login', component: LoginComponent },
  { path: 'mylogin', component: MyloginComponent },
  { path: 'myaccount', component: MyAccountComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'createusers', component: UserComponent },
  { path: 'activate_account/:id', component: ActivateAccountComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },

  { path: 'list', component: ListEmployeesComponent, resolve: {employeeList: EmployeeListResolverService}, canActivate: [AuthGuard]},
  { path: 'customers', component: CustomerComponent, canActivate: [AuthGuard]},
  { path: 'editEmployee/:id', component: CreateEmployeeComponent, canDeactivate: [CreateEmployeeCanDeactivateGuardService]},
  { path: 'employees/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeDetailsGuardService]},

  { path: 'merchants', component: ListMerchantsComponent, resolve: {merchantList: MerchantListResolverService}},
  { path: 'editMerchant/:id', component: CreateMerchantComponent
   // ,    canDeactivate:[CreateEmployeeCanDeactivateGuardService]
  },

  { path: '', redirectTo: '/home', pathMatch: 'full'},

  { path: 'notFound/:id', component: PageNotFoundComponent},
  { path: 'notFound', component: PageNotFoundComponent},


  { path: '**', component: PageNotFoundComponent}

];

@NgModule({
   //  imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
   imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
