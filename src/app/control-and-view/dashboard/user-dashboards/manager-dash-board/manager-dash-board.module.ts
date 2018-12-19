import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManagerDashBoardComponent } from './manager-dash-board.component';
 import { EditBatchWorkModule } from '../../../manager/scheduling/edit-batch-work/edit-batch-work.module';


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
      {
        path: 'EquipmentView/EquipmentEdit/:EquipKey',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/equipment-edit/equipment-edit.module#EquipmentEditModule',
        
      },
      {
        path: 'EquipmentView/EquipmentTypeView',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/equipment-type-view/equipment-type-view.module#EquipmentTypeViewModule',
        
      },
      {
        path: 'EquipmentView/EquipmentTypeView/EquipmentTypeCreate',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/equipment-type-create/equipment-type-create.module#EquipmentTypeCreateModule',
        
      },
      {
        path: 'EquipmentView/EquipmentTypeView/EquipmentTypeEdit/:EquipTypeKey',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/equipment-type-edit/equipment-type-edit.module#EquipmentTypeEditModule',
        
      },
      {
        path: 'DepartmentView',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/department-view/department-view.module#DepartmentViewModule',
        
      },
      {
        path: 'DepartmentView/DepartmentCreate',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/department-create/department-create.module#DepartmentCreateModule',
        
      },
      {
        path: 'DepartmentView/departmentEdit/:DeptKey',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/department-edit/department-edit.module#DepartmentEditModule',
        
      },
      {
        path: 'InspectionCreate',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inspection/inspection-create/inspection-create.module#InspectionCreateModule',
        
      },
      {
        path: 'InspectionView',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inspection/inspection-view/inspection-view.module#InspectionViewModule',
        
      },
      {
        path: 'InspectionView/Managerinspectiontemplate/:InspectionOrderKey',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inspection/managerinspectiontemplate/managerinspectiontemplate.module#ManagerinspectiontemplateModule',
        
      },
      {
        path: 'ViewInspectionManager/:InspectionOrderKey',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inspection/viewinspectionmanager/viewinspectiomanager.module#ViewinspectiomanagerModule',
        
      },
      {
        path: 'InspectiontemplateCreate',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inspection/inspectiontemplate-create/inspectiontemplate-create.module#InspectiontemplateCreateModule',
        
      },
      {
        path: 'InspectiontemplateandquestionsView',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inspection/inspectiontemplateandquestions-view/inspectiontemplateandquestions-view.module#InspectiontemplateandquestionsViewModule',
        
      },
      {
        path: 'InspectiontemplateandquestionsView/InspectiontemplateEdit',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inspection/inspectiontemplate-edit/inspectiontemplate-edit.module#InspectiontemplateEditModule',
        
      },
      {
        path: 'InspectiontemplatedetailEdit/:TemplateID',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inspection/inspectiontemplatedetail-edit/inspectiontemplatedetail-edit.module#InspectiontemplatedetailEditModule',
        
      },
      {
        path: 'DocumentfolderView',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/documents/documentfolder-view/documentfolder-view.module#DocumentfolderViewModule',
        
      },
      {
        path: 'DocumentfolderView/NewdocumentfolderCreate',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/documents/newdocumentfolder-create/newdocumentfolder-create.module#NewdocumentfolderCreateModule',
        
      },
      {
        path: 'DocumentfolderView/DocumentfolderEdit/:FormtypeId',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/documents/documentfolder-edit/documentfolder-edit.module#DocumentfolderEditModule',
        
      },
      {
        path: 'DocumentsUpload',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/documents/documents-upload/documents-upload.module#DocumentsUploadModule',
        
      },
      {
        path: 'ViewDocuments',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/documents/view-documents/view-documents.module#ViewDocumentsModule',
        
      },
      {
        path: 'SchedulingView',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/scheduling/scheduling-view/scheduling-view.module#SchedulingViewModule',
        
      },
      {
        path: 'SchedulingView/CreateBatchWork',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/scheduling/create-batch-work/create-batch-work.module#CreateBatchWorkModule',
        
      },
      {
        path: 'SchedulingView/EditBatchWork/:WorkorderScheduleKey',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/scheduling/edit-batch-work/edit-batch-work.module#EditBatchWorkModule',
        
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
