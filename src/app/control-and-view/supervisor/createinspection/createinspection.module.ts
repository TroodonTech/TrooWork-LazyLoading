import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupervisorDashboardModule } from '../../dashboard/user-dashboards/supervisor-dashboard/supervisor-dashboard.module';
import{ CreateinspectionComponent }   from './createinspection.component';
import { IgxDatePickerModule } from 'igniteui-angular';
import { CalendarModule } from 'primeng/calendar';
const routes: Routes = [
  {
    path: '',
    component: CreateinspectionComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    SupervisorDashboardModule,
    // UserDashboardsModule,
    // InventoryModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes),
    IgxDatePickerModule,
    CalendarModule
  ],
  declarations: [CreateinspectionComponent]
})
export class CreateinspectionModule { }
