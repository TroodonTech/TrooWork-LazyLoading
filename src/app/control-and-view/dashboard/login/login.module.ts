import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import{ ManagerDashBoardModule  } from '../user-dashboards/manager-dash-board/manager-dash-board.module';
import{ EmployeeDashbordModule  } from '../user-dashboards/employee-dashboard/employee-dashbord.module';
import{ SupervisorDashboardModule  } from '../user-dashboards/supervisor-dashboard/supervisor-dashboard.module';
import{ SuperadminDashboardModule } from '../user-dashboards/superadmin-dashboard/superadmin-dashboard.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ManagerDashBoardModule,
    EmployeeDashbordModule,
    SuperadminDashboardModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule, ReactiveFormsModule,
    SupervisorDashboardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
