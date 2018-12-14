import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import {  EmployeeProfileModule } from '../../user-profiles/employee-profile/employee-profile.module';

 const routes: Routes = [
  {
    path: 'EmployeeDashboard',
    component: EmployeeDashboardComponent,
    children: [
      {
        path: 'Emp_welcomePage',
        outlet: 'EmployeeOut',
        loadChildren: '../../user-welcome-pages/employee-welcome/employee-welcome.module#EmployeeWelcomeModule',

      },
      {
        path: 'Viewmeetingortrainingevent',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/viewmeetingortrainingevent/viewmeetingortrainingevent.module#ViewmeetingortrainingeventModule',

      },
      {
        path: 'Viewworkordersforemployee',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/viewworkordersforemployee/viewworkordersforemployee.module#ViewworkordersforemployeeModule',

      },
      {
        path: 'employeeMyProfile',
        outlet: 'EmployeeOut',
        loadChildren: '../../user-profiles/employee-profile/employee-profile.module#EmployeeProfileModule',

      },
     ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeeDashboardComponent],
  exports: [EmployeeDashboardComponent]

})
export class EmployeeDashbordModule { }
