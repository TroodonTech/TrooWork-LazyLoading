import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: './control-and-view/dashboard/login/login.module#LoginModule' // varun- first page to load for lazy loading.... 
  },
  // {
  //   path: '',
  //   component: LoginComponent
  // },
  // {
  //   path: 'welcomePage',
  //   component: WelcomepageComponent
  // },
  // {
  //   path: 'Buildview',
  //   component: BuildingViewComponent
  // },
  // {
  //   path: 'Createbuilding',
  //   component: CreatebuildingComponent
  // },
  // {
  //   path: 'Buildedit/:Facility_Key',
  //   component: BuildingEditComponent
  // },
  // {
  //   path: 'addEmployee',
  //   component: CreateEmployeeComponent
  // },
  // {

  //   path: 'Floorview',
  //   component: FloorViewComponent
  // },
  // {
  //   path: 'Createfloor',
  //   component: FloorCreateComponent
  // },
  // {
  //   path: 'Flooredit/:Floor_Key/:Facility_Key',
  //   component: FloorEditComponent
  // },
  // {
  //   path: 'EditWorkorderType/:WorkorderTypeKey',
  //   component: EditWorkorderTypeComponent
  // },
  // {
  //   path: 'manageLoginCredentials',
  //   component: ManageLoginCredentialsComponent
  // },
  // {
  //   path: 'resetPassword/:EmpKey',
  //   component: ResetPassWordComponent
  // },
  // {
  //   path: 'Zoneview',
  //   component: ZoneViewComponent
  // },
  // {
  //   path: 'Zonedit/:Floor_Key/:Facility_Key/:Zone_Key',
  //   component: ZoneEditComponent
  // },
  // {
  //   path: 'Createzone',
  //   component: ZoneCreateComponent
  // },
  // {
  //   path: 'Inspection-Report',
  //   component: InspectionReportComponent
  // },
  // {
  //   path: 'BarcodeReport',
  //   component: BarcodeReportComponent

  // },
  // {
  //   path: 'WorkorderReport',
  //   component: WorkorderReportComponent
  // },
  // {
  //   path: 'InspectionCreate',
  //   component: InspectionCreateComponent
  // },
  // {
  //   path: 'CreateInspectionTemplate',
  //   component: InspectiontemplateCreateComponent
  // },
  // {
  //   path: 'Dashboard-Report',
  //   component: DashboardReportComponent
  // },
  // {
  //   path: 'createDepartment',
  //   component: DepartmentCreateComponent
  // },
  // {
  //   path: 'departmentEdit/:DeptKey',
  //   component: DepartmentEditComponent
  // },
  // {
  //   path: 'DepartmentView',
  //   component: DepartmentViewComponent
  // },
  // {
  //   path: 'EquipmentView',
  //   component: EquipmentViewComponent
  // },
  // {
  //   path: 'EquipmentCreate',
  //   component: EquipmentCreateComponent
  // },
  // {
  //   path: 'EquipmentEdit/:EquipKey',
  //   component: EquipmentEditComponent
  // },
  // {
  //   path: 'EquipmentTypeCreate',
  //   component: EquipmentTypeCreateComponent
  // },
  // {
  //   path: 'EquipmentTypeView',
  //   component: EquipmentTypeViewComponent
  // },
  // {
  //   path: 'EquipmentTypeEdit/:EquipTypeKey',
  //   component: EquipmentTypeEditComponent
  // },
  // {
  //   path: 'roomView',
  //   component: RoomViewComponent
  // },
  // {
  //   path: 'roomTypeView',
  //   component: RoomTypeViewComponent
  // },
  // {
  //   path: 'roomTypeCreate',
  //   component: RoomTypeCreateComponent
  // },
  // {
  //   path: 'roomTypeEdit/:RoomTypeKey',
  //   component: RoomTypeUpdateComponent
  // },
  // {
  //   path: 'FloorTypeView',
  //   component: FloorTypeViewComponent
  // },
  // {
  //   path: 'FloorTypeCreate',
  //   component: FloorTypeCreateComponent
  // },
  // {
  //   path: 'FloorTypeEdit/:FloorTypeKey',
  //   component: FloorTypeEDitComponent
  // },
  // {
  //   path: 'roomCreate',
  //   component: RoomCreateComponent
  // },
  // {
  //   path: 'InspectiontemplateandquestionsView',
  //   component: InspectiontemplateandquestionsViewComponent
  // },
  // {
  //   path: 'InspectiontemplateEdit',
  //   component: InspectiontemplateEditComponent
  // },
  // {
  //   path: 'RoomEdit/:RoomKey',
  //   component: RoomEditComponent
  // },
  // {
  //   path: 'MeetingTrainingCreate',
  //   component: MeetingTrainingCreateComponent
  // },
  // {
  //   path: 'MeetingTrainingEdit/:EventKey/:ActionKey',
  //   component: MeetingTrainingEditComponent
  // },
  // {
  //   path: 'MeetingTrainingView',
  //   component: MeetingTrainingViewComponent
  // },
  // {
  //   path: 'EventEdit/:ActionKey/:ActionTypeKey',
  //   component: EventEditComponent
  // },
  // {
  //   path: 'EventView',
  //   component: EventViewComponent
  // },
  // {
  //   path: 'InspectiontemplatedetailEdit/:TemplateID',
  //   component: InspectiontemplatedetailEditComponent
  // },
  // {
  //   path: 'viewEventEmployees/:EventKey',
  //   component: ViewEmployeesofEventComponent
  // },
  // {
  //   path: 'Batch-work-order-Report',
  //   component: BatchWorkOrderReportComponent
  // },
  // {
  //   path: 'InspectionView',
  //   component: InspectionViewComponent
  // },
  // {
  //   path: 'CreateBatchWork',
  //   component: CreateBatchWorkComponent
  // },
  // {
  //   path: 'SchedulingView',
  //   component: SchedulingViewComponent
  // },
  // {
  //   path: 'EditBatchWork/:scheduleNameKey',
  //   component: EditBatchWorkComponent
  // },
  // {
  //   path: 'CreateBatchSchedule',
  //   component: CreateBatchScheduleComponent
  // },
  // {
  //   path: 'welcomeEmployee',
  //   component: EmployeeWelcomeComponent
  // },
  // {
  //   path: 'welcomeAdmin',
  //   component: AdminWelcomeComponent
  // },
  // {
  //   path: 'welcomeSuperAdmin',
  //   component: SuperadminWelcomeComponent
  // },
  // {
  //   path: 'welcomeSupervisor',
  //   component: SupervisorWelcomeComponent
  // },
  // {
  //   path: 'BatchScheduleAssignment',
  //   component: BatchScheduleAssignmentReportComponent
  // },
  // {
  //   path: 'createQuickOrder',
  //   component: CreateQuickOrderComponent
  // },
  // {
  //   path: 'ViewEmployee',
  //   component: ViewEmployeeComponent
  // },
  // {
  //   path: 'EditEmployeedetails/:EmployeeKey',
  //   component: EditEmployeedetailsComponent
  // },
  // {
  //   path: 'DocumentfolderView',
  //   component: DocumentfolderViewComponent
  // },
  // {
  //   path: 'NewdocumentfolderCreate',
  //   component: NewdocumentfolderCreateComponent
  // },

  // {
  //   path: 'ViewWorkOrder',
  //   component: ViewWorkOrdersComponent
  // },
  // {
  //   path: 'DocumentfolderEdit/:FormtypeId',
  //   component: DocumentfolderEditComponent
  // },
  // {
  //   path: 'managerMyProfile',
  //   component: ManagerMyprofileComponent
  // },
  // {
  //   path: 'DocumentsUpload',
  //   component: DocumentsUploadComponent
  // },
  // {
  //   path: 'ViewDocuments',
  //   component: ViewDocumentsComponent
  // },
  // {
  //   path: 'changePasswordManager/:EmployeeKey/:UserRoleName/:IsSupervisor',
  //   component: ManagerChangePassWordComponent
  // },
  // {
  //   path: 'superAdminMyProfile',
  //   component: SuperadminProfileComponent
  // },
  // {
  //   path: 'changePasswordSuperAdmin/:EmployeeKey/:UserRoleName/:IsSupervisor',
  //   component: SupeadminChangePasswordComponent
  // },
  // {
  //   path: 'adminMyProfile',
  //   component: AdminProfileComponent
  // },
  // {
  //   path: 'supervisorMyProfile',
  //   component: SupervisorProfileComponent
  // },
  // {
  //   path: 'employeeMyProfile',
  //   component: EmployeeProfileComponent
  // },
  // {
  //   path: 'changePasswordAdmin/:EmployeeKey/:UserRoleName/:IsSupervisor',
  //   component: AdminChangePasswordComponent
  // },
  // {
  //   path: 'changePasswordSupervisor/:EmployeeKey/:UserRoleName/:IsSupervisor',
  //   component: SupervisorChangePasswordComponent
  // },
  // {
  //   path: 'changePasswordEmployee/:EmployeeKey/:UserRoleName/:IsSupervisor',
  //   component: EmployeeChangePasswordComponent
  // },
  // {

  //   path: 'JobTitleView',
  //   component: JobTitleViewComponent
  // },
  // {
  //   path: 'JobTitleAdd',
  //   component: JobTitleAddComponent
  // },
  // {
  //   path: 'JobTitleEdit/:JobTitle_Key',
  //   component: JobTitleEditComponent
  // },
  // {

  //   path: 'JobTitleViewAdmin',
  //   component: JobTitleViewAdminComponent
  // },
  // {
  //   path: 'JobTitleAddAdmin',
  //   component: JobTitleAddAdminComponent
  // },
  // {
  //   path: 'JobTitleEditAdmin/:JobTitle_Key',
  //   component: JobTitleEditAdminComponent
  // },
  // {
  //   path: 'ViewDocuments',
  //   component: ViewDocumentsComponent
  // },
  // {
  //   path: 'CreateWorkOrder',
  //   component: CreateWorkorderComponent
  // },
  // {
  //   path: 'CreateOrganization',
  //   component: CreateOrganizationComponent
  // },
  // {
  //   path: 'ViewOrganization',
  //   component: ViewOrganizationComponent
  // },
  // {
  //   path: 'Orgedit/:OrganizationID',
  //   component: EditOrganizationComponent
  // },
  // {
  //   path: 'Createemployee',
  //   component: CreateemployeeComponent
  // },
  // {
  //   path: 'Viewemployee',
  //   component: ViewemployeeComponent
  // },
  // {
  //   path: 'Managelogincredentials',
  //   component: ManagelogincredentialsComponent
  // },
  // {
  //   path: 'Editemployee/:EmployeeKey',
  //   component: EditemployeeComponent
  // },
  // {
  //   path: 'Viewmeetingortrainingevent',
  //   component: ViewmeetingortrainingeventComponent
  // },
  // {
  //   path: 'Resetpasswordforsamodule/:EmpKey',
  //   component: ResetpasswordforsamoduleComponent
  // },
  // {
  //   path: 'Settingusernameandpswrdaftremplcreatebyman/:EmployeeKey/:str/:UserRoleTypeKey',
  //   component: SettingusernameandpswrdaftremplcreatebymanComponent
  // },
  // {
  //   path: 'Viewworkordersforemployee',
  //   component: ViewworkordersforemployeeComponent
  // },
  // {
  //   path: 'EditWorkOrder/:WorkorderKey',
  //   component: EditWorkOrderComponent
  // },
  // {
  //   path: 'EditBatchWorkorder/:WorkorderScheduleKey',
  //   component: EditBatchWorkorderComponent
  // },
  // {
  //   path: 'scheduleRoomView',
  //   component: BatchScheduleRoomComponent
  // },
  // {
  //   path: 'ViewInspectionManager/:InspectionOrderKey',
  //   component: ViewinspectionmanagerComponent
  // },
  // {
  //   path: 'EditWorkOrder/:WorkorderKey',
  //   component: EditWorkOrderComponent
  // },
  // {
  //   path: 'Managerinspectiontemplate/:InspectionOrderKey',
  //   component: ManagerinspectiontemplateComponent
  // },
  // {
  //   path: 'Createinspectionbysuprvsr',
  //   component: CreateinspectionComponent
  // },
  // {
  //   path: 'Viewinspctnbysprvsr',
  //   component: ViewinspctnbysprvsrComponent
  // },
  // {
  //   path: 'Supervsrinspectiontemplate/:InspectionOrderKey',
  //   component: SupervsrinspectiontemplateComponent
  // },
  // {
  //   path: 'EditWorkOrder/:WorkorderKey',
  //   component: EditWorkOrderComponent
  // },
  // {
  //   path: 'Training',
  //   component: TrainingComponent
  // },
  // {
  //   path: 'Managerinspectiontemplate/:InspectionOrderKey',
  //   component: ManagerinspectiontemplateComponent
  // },
  // {
  //   path: 'UpdateRecurWorkorder/:WorkorderKey',
  //   component: UpdateRecurWorkorderComponent
  // },
  // {
  //   path: 'CreateWorkOrderSuperVisor',
  //   component: CreateWorkOrderComponent
  // },
  // {
  //   path: 'createQuickOrderSuperVisor',
  //   component: CreateQuickWorkOrderComponent
  // },
  // {
  //   path: 'viewWorkOrderSupervisor',
  //   component: ViewWorkOrderComponent
  // },
  // {
  //   path: 'DepartmentCreate',
  //   component: CreateDepartmentComponent
  // },
  // {
  //   path: 'EditDepartment/:DeptKey',
  //   component: EditDepartmentComponent
  // },
  // {
  //   path: 'ViewDepartment',
  //   component: ViewDepartmentComponent
  // },
  // {
  //   path: 'manageLoginCreds',
  //   component: ManageLoginsComponent
  // },
  // {
  //   path: 'resetPasswords/:EmpKey',
  //   component: ResetPasswordsComponent
  // },
  // {
  //   path: 'addEmployeeAdmin',
  //   component: AddEmployeeComponent
  // },
  // {
  //   path: 'setUserLoginAdmin/:EmployeeKey/:str/:UserRoleTypeKey',
  //   component: SetLoginCredentialsForUserComponent
  // },
  // {
  //   path: 'viewEmployeeAdmin',
  //   component: ViewEmployeeAdminComponent
  // },
  // {
  //   path: 'editEmpDetailsAdmin/:EmployeeKey',
  //   component: EditEmployeeDetailsAdminComponent
  // },
  // {
  //   path: 'CreateBatchWorkOrder',
  //   component: CreateBatchWorkorderComponent
  // },

  // {
  //   path: 'ViewBatchWorkorder',
  //   component: ViewBatchWorkorderComponent
  // },

  // {
  //   path: 'WorkOrderType',
  //   component: WorkOrderTypeComponent
  // },
  // {
  //   path: 'CreateWorkorderType',
  //   component: CreateWorkorderTypeComponent
  // },
  // {
  //   path: 'setUserLoginSuper/:EmployeeKey/:str/:UserRoleTypeKey/:Organization',
  //   component: SetUserLoginSuperComponent
  // },
  // {
  //   path: 'editScheduleForReport/:scheduleKey',
  //   component: EditAssignmentScheduleForReportComponent
  // },
  // {
  //   path: 'reviews/:rev_orgid/:room_key',
  //   component: ReviewsComponent
  // }
];


@NgModule({
  imports: [
    CommonModule, RouterModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
