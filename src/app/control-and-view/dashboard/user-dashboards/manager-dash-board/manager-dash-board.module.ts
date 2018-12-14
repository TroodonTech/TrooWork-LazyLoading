import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManagerDashBoardComponent } from './manager-dash-board.component';
 import { EquipmentCreateModule } from '../../../manager/inventory/equipment-create/equipment-create.module';


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
      {
        path: 'ZoneView/Zonedit/:Floor_Key/:Facility_Key/:Zone_Key',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/zone-edit/zone-edit.module#ZoneEditModule',
        
      },
      {
        path: 'roomView',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/room-view/room-view.module#RoomViewModule',
        
      },
      {
        path: 'roomView/RoomEdit/:RoomKey',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/room-edit/room-edit.module#RoomEditModule',
        
      },
      {
        path: 'roomView/RoomCreate',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/room-create/room-create.module#RoomCreateModule',
        
      },
      {
        path: 'roomView/RoomTypeView',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/room-type-view/room-type-view.module#RoomTypeViewModule',
        
      },
      {
        path: 'roomView/RoomTypeView/RoomTypeCreate',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/room-type-create/room-type-create.module#RoomTypeCreateModule',
        
      },
      {
        path: 'roomView/RoomTypeView/roomTypeEdit/:RoomTypeKey',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/room-type-update/room-type-update.module#RoomTypeUpdateModule',
        
      },
      {
        path: 'roomView/FloorTypeView',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/floor-type-view/floor-type-view.module#FloorTypeViewModule',
        
      },
      {
        path: 'roomView/FloorTypeView/FloorTypeCreate',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/floor-type-create/floor-type-create.module#FloorTypeCreateModule',
        
      },
      {
        path: 'roomView/FloorTypeView/FloorTypeEdit/:FloorTypeKey',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/floor-type-edit/floor-type-edit.module#FloorTypeEditModule',
        
      },
      {
        path: 'EquipmentView',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/equipment-view/equipment-view.module#EquipmentViewModule',
        
      },
      {
        path: 'EquipmentView/EquipmentCreate',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/equipment-create/equipment-create.module#EquipmentCreateModule',
        
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
