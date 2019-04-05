import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConectionSettings } from './ConnectionSetting';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http: HttpClient) { }
  // code by sudina starts
  getallsupervisor(empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/supervisorname?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  getinspectionreport(fromdate, todate, SupervisorKey, orgID) {

    return this
      .http
      .get(ConectionSettings.Url + '/viewinspection_Filter?key=' + SupervisorKey + '&searchDT=' + fromdate + '&searchDT2=' + todate + '&OrganizationID=' + orgID);
  }
  getinspectionreport_bydate(fromdate, todate, empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/viewinspectionReport_FilterByDates?employeekey=' + empKey + '&searchDT=' + fromdate + '&searchDT2=' + todate + '&OrganizationID=' + orgID);
  }
  getallemployee(empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/allemployees?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  getallworkordertype(empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/allWorkordertype?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  getpievalues(currentdate, empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/valuesForPie?date=' + currentdate + '&empkey=' + empKey + '&userkey=' + empKey + '&OrganizationID=' + orgID);
  }
  getdashboardreport(dateTemp_1, dateTemp_2, em_Key, Workorder_TypeKey, empKey, orgID) {
    const url = ConectionSettings.Url + '/getEmployeeForPie';
    const obj = {
      Date: dateTemp_1,
      Date1: dateTemp_2,
      EmployeeKey: em_Key,
      WorkorderTypeKey: Workorder_TypeKey,
      managerKey: empKey,
      OrganizationID: orgID
    };
    return this
      .http
      .post(url, obj);
  }
  getvaluesfilterbypie(dateTemp_1, dateTemp_2, em_Key, Workorder_TypeKey, org_id, Manager) {
    const url = ConectionSettings.Url + '/workorderByfilterPie';
    const obj = {
      manager: Manager,
      workorderDate: dateTemp_1,
      workorderDate2: dateTemp_2,
      employeeKey: em_Key,
      workorderTypeKey: Workorder_TypeKey,
      OrganizationID: org_id
    };
    return this
      .http
      .post(url, obj);

  }
  getallbatchschedules(empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/getBatchScheduleName?empkey=' + empKey + '&OrganizationID=' + orgID);
  }
  getbatchschedulereport(Workorder_ScheduleKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/BatchSchedule_Report?WorkorderScheduleKey=' + Workorder_ScheduleKey + '&OrganizationID=' + orgID);
  }
  getScheduleAssignReport(Workorder_ScheduleKey, empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/viewScheduleReport?BatchScheduleNameKey=' + Workorder_ScheduleKey + '&employeekey=' + empKey + '&OrganizationID=' + orgID);
  }
  // code by sudina ends


  // code by Anju starts
  //Services for barcode reporting 
  getBarcodeReport(empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/allfacility?empkey=' + empKey + '&OrganizationID=' + orgID);
  }

  getEquipmentType(empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/allequiptype?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }

  getEquipment(empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/getallEquipments?employeekey=' + empKey + '&OrganizationID=' + orgID);
  }

  getFloor(key, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/domainvaluesByKey?domain=facilityOnly&key=' + key + '&OrganizationID=' + orgID);
  }
  geteq_values(dom, eqtypekey, OrganizationID) {
    return this
      .http
      .get(ConectionSettings.Url + '/domainvaluesByKey?domain=' + dom + '&key=' + eqtypekey + '&OrganizationID=' + OrganizationID);
  }
  getZone(fkey, floorkey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/zoneByFacility_Floor?fkey=' + fkey + '&floorkey=' + floorkey + '&OrganizationID=' + orgID);
  }

  getRoomtype(fkey, floorkey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/roomtypeByFacility_Floor?fkey=' + fkey + '&floorkey=' + floorkey + '&OrganizationID=' + orgID);
  }


  generateBarcodeReportService(FacilityKey, FloorKey, RoomTypeKey, ZoneKey, empKey, orgID) {
    const url = ConectionSettings.Url + '/barcodeReportByallFilters';
    const obj = {
      OrganizationID: orgID,
      manager: empKey,
      facilitykey: FacilityKey,
      floorKey: FloorKey,
      roomTypeKey: RoomTypeKey,
      zoneKey: ZoneKey


    };
    return this
      .http
      .post(url, obj);

  }
  //services for workorder reporting
  getEmployee(empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/getAllValueByDomain?domainName=employees&empkey' + empKey + '&OrganizationID=' + orgID);
  }

  getWorkstatus(empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/getAllValueByDomain?domainName=workstatus&empkey' + empKey + '&OrganizationID=' + orgID);
  }

  getRooms(fkey, floorkey, zonekey, empKey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/roomByFacility_Floor_zone?fkey=' + fkey + '&floorkey=' + floorkey + '&zonekey=' + zonekey + '&OrganizationID=' + orgID);
  }

  generateBarcodeByEqupimenttype(EquipmentKey, EquipmentTypeKey, employeekey, OrganizationID) {
    const url = ConectionSettings.Url + '/barcodeReportByEquipment';
    const obj = {
      OrganizationID: OrganizationID,
      employeekey: employeekey,
      EquipmentTypeKey: EquipmentTypeKey,
      EquipmentKey: EquipmentKey


    };
    return this
      .http
      .post(url, obj);
  }
  //Pooja's code starts here
  generateBarcodeByEqupiment(EquipmentKey, EquipmentTypeKey, employeekey, OrganizationID) {
    const url = ConectionSettings.Url + '/barcodeReportByEquipment';
    const obj = {
      OrganizationID: OrganizationID,
      employeekey: employeekey,
      EquipmentTypeKey: EquipmentTypeKey,
      EquipmentKey: EquipmentKey

    };

    return this
      .http
      .post(url, obj);
  }
  getRoom(fkey, floorkey, OrganizationID) {
    return this
      .http
      .get(ConectionSettings.Url + '/roomByFacility_Floor?fkey=' + fkey + '&floorkey=' + floorkey + '&OrganizationID=' + OrganizationID);
  }
  generateWorkOrderReportServicewithdate(FacilityKey, FloorKey, RoomTypeKey, ZoneKey, fromdate, date1, RoomKey, EmployeeKey, WorkorderStatusKey, employeekey, OrganizationID) {
    const url = ConectionSettings.Url + '/workorderReportByallFilters';
    const obj = {
      OrganizationID: OrganizationID,
      manager: employeekey,
      workorderDate: fromdate,
      workorderDate2: date1,
      facilitykey: FacilityKey,
      floorKey: FloorKey,
      roomTypeKey: RoomTypeKey,
      zoneKey: ZoneKey,
      roomKey: RoomKey,
      employeeKey: EmployeeKey,
      workorderStatusKey: WorkorderStatusKey
    };
    return this
      .http
      .post(url, obj);


  }


  generateWorkOrderReportService(FacilityKey, FloorKey, RoomTypeKey, ZoneKey, fromdate, todate, RoomKey, EmployeeKey, WorkorderStatusKey, empKey, orgID) {
    const url = ConectionSettings.Url + '/workorderReportByallFilters';
    const obj = {
      OrganizationID: orgID,
      manager: empKey,
      workorderDate: fromdate,
      workorderDate2: todate,
      facilitykey: FacilityKey,
      floorKey: FloorKey,
      roomTypeKey: RoomTypeKey,
      zoneKey: ZoneKey,
      roomKey: RoomKey,
      employeeKey: EmployeeKey,
      workorderStatusKey: WorkorderStatusKey
    };
    return this
      .http
      .post(url, obj);

  }

  //code by Anju Ends
  // @Author Rodney - For inventory starts
  generateDowntimeWeeklyReport(fromdate, todate, EmployeeKeyString, OrganizationID) {
    const url = ConectionSettings.Url + '/generatedowntimeWeeklyReport';
    const obj = {
      fromdate: fromdate,
      todate: todate,
      employeekeyList: EmployeeKeyString,
      OrganizationID: OrganizationID
    };
    return this
      .http
      .post(url, obj);
  }
  getAllFloor(fackey, orgID) {
    return this
      .http
      .get(ConectionSettings.Url + '/getAllFloorsForbuildings?facilityKey=' + fackey + '&OrganizationID=' + orgID);
  }
  getAllZone(fackey, flrkey, orgID) {
    const obj = {
      facilityKey: fackey,
      FloorKey: flrkey,
      OrganizationID: orgID
    }
    return this
      .http
      .post(ConectionSettings.Url + '/getAllZonebuildings', obj);
  }
  getAllFloorType(fackey, flrkey, zonekey, rtkey, orgID) {
    const obj = {
      facilityKey: fackey,
      FloorKey: flrkey,
      ZoneKey: zonekey,
      RoomTypeKey: rtkey,
      OrganizationID: orgID
    }
    return this
      .http
      .post(ConectionSettings.Url + '/getAllFloorTypebuildings', obj);
  }
  getAllRoomType(fackey, flrkey, zonekey, orgID) {
    const obj = {
      facilityKey: fackey,
      FloorKey: flrkey,
      ZoneKey: zonekey,
      OrganizationID: orgID
    }
    return this
      .http
      .post(ConectionSettings.Url + '/getAllRoomTypebuildings', obj);
  }
  getAllRooms(fackey, flrkey, zonekey, flrTKey, rtKey, orgID) {
    const obj = {
      facilityKey: fackey,
      FloorKey: flrkey,
      ZoneKey: zonekey,
      RoomTypeKey: rtKey,
      FloorTypeKey: flrTKey,
      OrganizationID: orgID
    }
    return this
      .http
      .post(ConectionSettings.Url + '/getAllRoombuildings', obj);
  }
  generateInventoryReportService(FacilityKey, FloorKey, ZoneKey, RoomTypeKey, FloorTypeKey, RoomKey, orgID) {
    const url = ConectionSettings.Url + '/inventoryReportByallFilters';
    const obj = {
      OrganizationID: orgID,
      facilitykey: FacilityKey,
      floorKey: FloorKey,
      zoneKey: ZoneKey,
      roomTypeKey: RoomTypeKey,
      floorTypeKey: FloorTypeKey,
      roomKey: RoomKey
    };
    return this
      .http
      .post(url, obj);

  }

  generateDowntimeReportService(fromdate, EmployeeKey, OrganizationID) {
    const url = ConectionSettings.Url+'/generatedowntimeReport';
    const obj = {
      fromdate: fromdate,
      employeekey: EmployeeKey,
      OrganizationID: OrganizationID
    };
    return this
      .http
      .post(url, obj);
  }
  // @Author Rodney - For inventory ends
}
