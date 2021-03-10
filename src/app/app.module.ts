import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorAlertComponent } from './error-alert/error-alert.component'
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { ConfirmEqualValidatorDirective } from './shared/confirm-equal-validator.directive'


import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive'
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from './employees/employee.service';

import { DisplayEmployeeComponent } from './employees/display-employee.component'
import { CreateEmployeeCanDeactivateGuardService } from './employees/create-employee-can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';
import { AccordionComponent } from './shared/accordion/accordion.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CreateMerchantComponent } from './merchant/create-merchant.component';
import { ListMerchantsComponent } from './merchant/list-merchants.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesComponent,
    PageNotFoundComponent,
    ErrorAlertComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    ConfirmEqualValidatorDirective,
    SelectRequiredValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    AccordionComponent,
    ErrorAlertComponent,
    CreateMerchantComponent,
    ListMerchantsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [EmployeeService
             ,CreateEmployeeCanDeactivateGuardService,
             EmployeeListResolverService,
             EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}