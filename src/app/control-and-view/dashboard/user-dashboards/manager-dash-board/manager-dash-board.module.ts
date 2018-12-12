import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManagerDashBoardComponent } from './manager-dash-board.component';
 import { ZoneCreateModule } from '../../../manager/inventory/zone-create/zone-create.module';


const routes: Routes = [
  {
    path: 'ManagerDashBoard',
    component: ManagerDashBoardComponent,
    children: [
      {
        path: 'Buildview',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/building-view/building-view.module#BuildingViewModule',
        
      },
      {
        path: 'welcomePage',
        outlet: 'ManagerOut',
        loadChildren: '../../user-welcome-pages/welcomepage/welcomepage.module#WelcomepageModule',

      },
      {
        path: 'Buildview/Createbuilding',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/createbuilding/createbuilding.module#CreatebuildingModule',

      },
      {
        path: 'Buildview/Buildedit/:Facility_Key',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/building-edit/building-edit.module#BuildingEditModule',

      },
      {
        path: 'FloorView',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/floor-view/floor-view.module#FloorViewModule',
        
      },
      {
        path: 'FloorView/FloorCreate',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/floor-create/floor-create.module#FloorCreateModule',

      },
      {
        path: 'FloorView/Flooredit/:Floor_Key/:Facility_Key',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/floor-edit/floor-edit.module#FloorEditModule',

      },
      {
        path: 'ZoneView',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/zone-view/zone-view.module#ZoneViewModule',
        
      },
      {
        path: 'ZoneView/ZoneCreate',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/zone-create/zone-create.module#ZoneCreateModule',
        
      },
      // {
      //   path: 'second',
      //   outlet: 'menucontent',
      //   component: SecondPage
      // }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManagerDashBoardComponent],
  exports: [ManagerDashBoardComponent]
})
export class ManagerDashBoardModule { }
