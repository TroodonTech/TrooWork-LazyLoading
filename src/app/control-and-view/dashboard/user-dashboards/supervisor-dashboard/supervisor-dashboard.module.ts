import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SupervisorDashboardComponent } from './supervisor-dashboard.component';
import {  CreateWorkOrderModule } from '../../../supervisor/create-work-order/create-work-order.module';
const routes: Routes = [
  {
    path: 'SupervisorDashboard',
    component: SupervisorDashboardComponent,
    children: [
      {
        path: 'Supervisor_welcomePage',
        outlet: 'Superout',
        loadChildren: '../../user-welcome-pages/supervisor-welcome/supervisor-welcome.module#SupervisorWelcomeModule',
      },
      {
        path: 'createQuickOrderSuperVisor',
        outlet: 'Superout',
        loadChildren: '../../../supervisor/create-quick-work-order/create-quick-work-order.module#CreateQuickWorkOrderModule',
      },
      {
        path: 'CreateWorkOrderSuperVisor',
        outlet: 'Superout',
        loadChildren: '../../../supervisor/create-work-order/create-work-order.module#CreateWorkOrderModule',
      },
      
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SupervisorDashboardComponent],
  exports:[SupervisorDashboardComponent]
})
export class SupervisorDashboardModule { }
