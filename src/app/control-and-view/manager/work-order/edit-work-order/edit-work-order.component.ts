import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { workorder } from '../../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-edit-work-order',
  templateUrl: './edit-work-order.component.html',
  styleUrls: ['./edit-work-order.component.scss']
})
export class EditWorkOrderComponent implements OnInit {
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  delete_curwo;
  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  WO_Key: object;
  EmployeeOption: workorder[];
  workorderTypeList: workorder[];
  facilitylist: workorder[];
  FloorList: workorder[];
  zonelist: workorder[];
  RoomTypeList: workorder[];
  RoomList: workorder[];
  priorityList: workorder[];
  EquipmentList: workorder[];
  EquipmentTypeList: workorder[];
  floorvalue;
  WOEditList;
  isPhotoRequired: any;
  isBarcodeRequired: any;
  marked = false;
  dateValue: Date;
  showEqTypes = false;
  WorkorderNotes;
  workordertypekey;
  FacilityKey;
  FloorKey;
  ZoneKey;
  RoomTypeKey;
  RoomKey;
  PriorityKey;
  EquipmentTypeKey;
  EquipmentKey;
  EmployeeKey;
  timeValue;
  deleteWO;
  wot;
  notes;
  facilityString;
  zone;
  eqp_key;
  shift;
  priority;
  isReccuring;
  isrecurring; // for setting bit value 1 or 0
  startDT;
  endDT;
  workTime;
  dailyRecc_gap; // dailyreccuringGap
  is_PhotoRequired;
  is_BarcodeRequired;
  occurenceinstance;

  intervaltype;
  repeatinterval;
  occursonday;
  emp_key;
  workorderCreation;
  timetable = { times: [] };
  count = 0;
  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService) {
    this.route.params.subscribe(params => this.WO_Key = params.WorkorderKey);
  }

  // adding properties and methods that will be used by the igxDatePicker
  public date: Date = new Date(Date.now());

  private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });

  public formatter = (_: Date) => {
    return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
  }
  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };
  ngOnInit() {
    this.workordertypekey = "";
    this.FacilityKey = "";
    this.FloorKey = "";
    this.ZoneKey = "";
    this.RoomTypeKey = "";
    this.RoomKey = "";
    this.PriorityKey = "";
    this.EmployeeKey = "";
    this.EquipmentTypeKey = "";
    this.EquipmentKey = "";
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.WorkOrderServiceService
      .getWO_edit(this.WO_Key, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.WOEditList = data[0];
        this.WorkOrderServiceService
          .getallFloor(this.WOEditList.FacilityKey, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.FloorList = data;
          });
        this.WorkOrderServiceService
          .getzone_facilityfloor(this.WOEditList.FloorKey, this.WOEditList.FacilityKey, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.zonelist = data;
          });
        this.WorkOrderServiceService
          .getroomType_facilityfloor(this.WOEditList.FloorKey, this.WOEditList.FacilityKey, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.RoomTypeList = data;
          });
        this.WorkOrderServiceService
          .getRoom_facilityfloor(this.WOEditList.FloorKey, this.WOEditList.FacilityKey, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.RoomList = data;
          });

        if (this.WOEditList.EquipmentKey == -1) {
          this.showEqTypes = false;
          this.FloorKey = this.WOEditList.FloorKey;
          this.RoomTypeKey = this.WOEditList.RoomTypeKey;
          this.ZoneKey = this.WOEditList.ZoneKey;
          this.RoomKey = this.WOEditList.RoomKey;
        }
        else {
          this.showEqTypes = true;
          this.RoomTypeKey = "";

          this.WorkOrderServiceService
            .getFloor(this.WO_Key, this.OrganizationID)
            .subscribe((data: any[]) => {

              this.floorvalue = parseInt(data[0].FloorKeyList);
              this.FloorKey = this.floorvalue;
              this.WorkOrderServiceService
                .getallEquipment(this.WOEditList.FacilityKey, this.floorvalue, this.OrganizationID)
                .subscribe((data: any[]) => {
                  this.EquipmentTypeList = data;
                });
              this.WorkOrderServiceService
                .getEquipment_typechange(this.WOEditList.EquipmentTypeKey, this.WOEditList.FacilityKey, this.floorvalue, this.OrganizationID)
                .subscribe((data: any[]) => {
                  this.EquipmentList = data;
                });
            });
          this.EquipmentTypeKey = this.WOEditList.EquipmentTypeKey;
          this.EquipmentKey = this.WOEditList.EquipmentKey;
        }
        if (this.WOEditList.IsPhotoRequired == 1) {
          this.isPhotoRequired = true;
        }
        else {
          this.isPhotoRequired = false;
        }
        if (this.WOEditList.IsBarcodeRequired == 1) {
          this.isBarcodeRequired = true;
        }
        else {
          this.isBarcodeRequired = false;
        }
        this.dateValue = new Date(this.WOEditList.WorkorderDate);
        var date_time = this.dateValue;

        this.workordertypekey = this.WOEditList.WorkorderTypeKey;
        this.FacilityKey = this.WOEditList.FacilityKey;
        if (this.WOEditList.PriorityKey) {
          this.PriorityKey = this.WOEditList.PriorityKey;
        }
        this.WorkorderNotes = this.WOEditList.WorkorderNotes;

        this.EmployeeKey = this.WOEditList.EmployeeKey;
        if (this.EmployeeKey == -1) {
          this.EmployeeKey = "";
        }

        var cur_time = new Date(Date.now());

        var timeValue1 = this.WOEditList.WorkorderTime;
        var test = timeValue1.split(":");
        var today = new Date(cur_time.getFullYear(), cur_time.getMonth(), cur_time.getDate(), test[0], test[1], 0);
        this.timeValue = today;
      });

    this.WorkOrderServiceService
      .getallFacility(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.facilitylist = data;
      });
    this.WorkOrderServiceService
      .getallworkorderType(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.workorderTypeList = data;
      });
    this.WorkOrderServiceService
      .getallPriority(this.OrganizationID)
      .subscribe((data: any[]) => {
        this.priorityList = data;
      });
    this.WorkOrderServiceService
      .getallEmployee(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.EmployeeOption = data;
      });

  }
  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }
  getFloorDisp(facilityName) {
    if (facilityName) {
      this.WorkOrderServiceService
        .getallFloor(facilityName, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.FloorList = data;
          this.FloorKey = "";
          this.ZoneKey = "";
          this.RoomTypeKey = "";
          this.RoomKey = "";
          this.EquipmentTypeKey = "";
          this.EquipmentKey = "";
        });
    }
    else {
      this.FloorKey = "";
      this.ZoneKey = "";
      this.RoomTypeKey = "";
      this.RoomKey = "";
      this.EquipmentTypeKey = "";
      this.EquipmentKey = "";
    }
  }
  getZoneRoomTypeRoom(floor, facility) {
    if (floor && facility) {
      if ((this.FloorKey) && (this.showEqTypes == true)) {
        this.ZoneKey = -1;
        this.RoomTypeKey = -1;
        this.RoomKey = -1;
      }
      else {
        this.WorkOrderServiceService
          .getzone_facilityfloor(floor, facility, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.zonelist = data;
            this.ZoneKey = "";
          });
        this.WorkOrderServiceService
          .getroomType_facilityfloor(floor, facility, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.RoomTypeList = data;
            this.RoomTypeKey = "";
          });
        this.WorkOrderServiceService
          .getRoom_facilityfloor(floor, facility, this.OrganizationID)
          .subscribe((data: any[]) => {
            this.RoomList = data;
            this.RoomKey = "";
          });
      }
    }
    else {
      this.ZoneKey = "";
      this.RoomTypeKey = "";
      this.RoomKey = "";
      this.EquipmentTypeKey = "";
      this.EquipmentKey = "";
    }
  }
  getRoomTypeRoom(zone, facility, floor) {
    if (zone && facility && floor) {
      this.WorkOrderServiceService
        .getRoomtype_zone_facilityfloor(zone, floor, facility, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.RoomTypeList = data;
          this.RoomTypeKey = "";
        });
      this.WorkOrderServiceService
        .getRoom_zone_facilityfloor(zone, floor, facility, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.RoomList = data;
          this.RoomKey = "";
        });
    }
    else {
      this.RoomTypeKey = "";
      this.RoomKey = "";
    }
  }
  getRoom(roomtype, zone, facility, floor) {
    if (roomtype && zone && facility && floor) {
      this.WorkOrderServiceService
        .getRoom_Roomtype_zone_facilityfloor(roomtype, zone, floor, facility, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.RoomList = data;
          this.RoomKey = "";
        });
    }
    else {
      this.RoomKey = "";
    }
  }
  showEquipment_typechange(equip_type, facility, floor) {
    if (equip_type && facility && floor) {
      this.WorkOrderServiceService
        .getEquipment_typechange(equip_type, facility, floor, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.EquipmentList = data;
          this.EquipmentKey = "";
        });
    }
    else {
      this.EquipmentKey = "";
    }
  }
  getEquiment(floor_key, facility_key) {
    if (floor_key && facility_key) {
      this.WorkOrderServiceService
        .getallEquipment(facility_key, floor_key, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.EquipmentTypeList = data;
          this.EquipmentList = data;
          this.EquipmentKey = "";
          this.EquipmentTypeKey = "";
        });
    }
    else {
      this.EquipmentKey = "";
      this.EquipmentTypeKey = "";
    }
  }
  DeleteWO() {
    this.deleteWO = {
      workorderkey: this.WO_Key,
      OrganizationID: this.OrganizationID
    };
    this.WorkOrderServiceService
      .deleteCurrent_WO(this.deleteWO)
      .subscribe((data: any[]) => {
        alert("Work-order deleted successfully");
        this.router.navigateByUrl('/ViewWorkOrder');
      });
  }
  UpdateWO() {
    if (this.showEqTypes === false) {
      this.createWorkorder1();
      console.log('Equipment***Not');

    } else {
      this.createWorkorder2();
    }
  }
  createWorkorder1() {
    if (!this.workordertypekey) {
      alert("Please select work-order type!");
    }
    else if (!this.FacilityKey) {
      alert("Please select building!");
    }
    else if (!this.FloorKey) {
      alert("Please select floor!");
    }
    else if (!(this.timeValue)) {
      alert("Please provide time!");
    }
    else {
      var roomlistObj = [];
      var roomtypelistObj = [];
      var zonelistObj = [];
      var floorlistObj = [];
      var facilitylistObj = [];
      var facilityList = [];
      var roomList = [];
      var roomtypeList = [];
      var zoneList = [];
      var floorList = []; facilitylistObj = this.facilitylist;
      facilityList = [];
      roomList = [];
      roomtypeList = [];
      zoneList = [];
      floorList = [];
      floorlistObj = this.FloorList;
      zonelistObj = this.zonelist;
      roomtypelistObj = this.RoomTypeList;
      roomlistObj = this.RoomList;

      this.intervaltype = '0'; // char(1),/*d for day, w for week, m for month*/
      this.repeatinterval = 1; // int,/*daily(every `2` days) weekly(every `1` week) monthly(every `3` months)*/
      this.occurenceinstance = null; // int,/*daily(3) weekly(null) monthly(null) monthly(1)*/
      this.occursonday = null;
      if (this.workordertypekey) {
        this.wot = this.workordertypekey;
      } else {
        this.wot = null;

      }
      if (this.WorkorderNotes) {
        this.notes = this.WorkorderNotes;
      } else {
        this.notes = null;
      }
      if (this.FacilityKey) {

      }
      if (this.FloorKey) {


      }

      var roomsString;
      if (this.RoomKey) {
        roomsString = this.RoomKey;
      } else {
        if (roomlistObj) {

          for (var j = 0; j < roomlistObj.length; j++) {
            roomList.push(roomlistObj[j].RoomKey);
          }
          roomsString = roomList.join(',');
        } else {

          return;
        }
      }


      var facilityString;
      if (this.FacilityKey) {
        facilityString = this.FacilityKey;
      } else {
        if (facilitylistObj) {

          for (var j = 0; j < facilitylistObj.length; j++) {
            facilityList.push(facilitylistObj[j].FacilityKey);
          }
          facilityString = facilityList.join(',');
        }
      }

      var floorString;
      if (this.FloorKey) {
        floorString = this.FloorKey;
      } else {
        if (floorlistObj) {

          for (var j = 0; j < floorlistObj.length; j++) {
            floorList.push(floorlistObj[j].FloorKey);
          }
          floorString = floorList.join(',');
        }
      }

      var zoneString;
      if (this.ZoneKey) {
        zoneString = this.ZoneKey;
      } else {
        this.zone = null;
        if (zonelistObj) {

          for (var j = 0; j < zonelistObj.length; j++) {
            zoneList.push(zonelistObj[j].ZoneKey);
          }
          zoneString = zoneList.join(',');
        }
      }

      var roomtypeString;
      if (this.RoomTypeKey) {
        roomtypeString = this.RoomTypeKey;
      } else {
        if (roomtypelistObj) {

          for (var j = 0; j < roomtypelistObj.length; j++) {
            roomtypeList.push(roomtypelistObj[j].RoomTypeKey);
          }
          roomtypeString = roomtypeList.join(',');
        }
      }
      if (this.EquipmentKey) {
        this.eqp_key = this.EquipmentKey;
      } else {
        this.eqp_key = - 1;
      }

      if (this.EmployeeKey) {
        this.emp_key = this.EmployeeKey;
      } else {
        this.emp_key = - 1;
      }
      if (this.ZoneKey) {
        this.zone = this.ZoneKey;
      } else {
        this.zone = null;

      }

      if (this.PriorityKey) {
        this.priority = this.PriorityKey;
      } else {
        this.priority = - 1;
      }
      if (this.isPhotoRequired) {
        this.is_PhotoRequired = 1;
      } else {
        this.is_PhotoRequired = 0;
      }
      if (this.isBarcodeRequired) {
        this.is_BarcodeRequired = 1;
      } else {
        this.is_BarcodeRequired = 0;
      }


      this.isReccuring = false;
      this.isrecurring = 0;

      if (this.dateValue) {
        this.startDT = this.convert_DT(this.dateValue);
      } else {
        this.startDT = this.convert_DT(new Date());
      }
      this.endDT = this.startDT;
    }
    if (this.timeValue) {
      this.workTime = this.timeValue.getHours() + ':' + this.timeValue.getMinutes();
    } else {
      this.workTime = new Date().getHours() + ':' + new Date().getMinutes();
    }

    this.workorderCreation = {
      occursontime: this.workTime,
      workorderkey: - 99,
      workordertypekey: this.wot,
      workordernote: this.notes,
      equipmentkey: this.eqp_key,
      roomkeys: roomsString,
      facilitykeys: facilityString,
      floorkeys: floorString,
      zonekeys: zoneString,
      roomtypekeys: roomtypeString,
      employeekey: this.emp_key,
      priority: this.priority,
      fromdate: this.startDT,
      todate: this.endDT,
      isbar: this.is_BarcodeRequired,
      isphoto: this.is_PhotoRequired,
      metaupdatedby: this.employeekey,
      OrganizationID: this.OrganizationID,
      intervaltype: '0', // char(1),/*d for day, w for week, m for month*/
      repeatinterval: 1,
      occursonday: null
    };
    this.WorkOrderServiceService.addWorkOrderWithOutEqup(this.workorderCreation).subscribe((data: any[]) => {
      this.deleteWO = {
        workorderkey: this.WO_Key,
        OrganizationID: this.OrganizationID
      };
      this.WorkOrderServiceService
        .deleteCurrent_WO(this.deleteWO)
        .subscribe((data: any[]) => {
          alert("Work-order updated successfully");
          this.router.navigateByUrl('/ViewWorkOrder');
        });
    });
  }

  createWorkorder2() {
    if (!this.workordertypekey) {
      alert("Please select work-order type!");
    }
    else if (!this.FacilityKey) {
      alert("Please select building!");
    }
    else if (!this.FloorKey) {
      alert("Please select floor!");
    }
    else if (!(this.timeValue)) {
      alert("Please provide time!");
    } else if (this.showEqTypes == true && !(this.EquipmentTypeKey)) {
      alert("Please select equipment type!");
    }
    else {
      var roomlistObj = [];

      var roomtypelistObj = [];

      var zonelistObj = [];

      var floorlistObj = [];

      var facilitylistObj = [];


      var EquListObj = [];



      var facilityList = [];

      var roomList = [];

      var roomtypeList = [];

      var zoneList = [];

      var floorList = [];

      var equList = [];
      facilitylistObj = this.facilitylist;
      facilityList = [];
      roomList = [];
      roomtypeList = [];
      zoneList = [];
      floorList = [];
      equList = [];
      floorlistObj = this.FloorList;
      zonelistObj = this.zonelist;
      roomtypelistObj = this.RoomTypeList;
      roomlistObj = this.RoomList;
      EquListObj = this.EquipmentList;

      this.intervaltype = '0';
      this.repeatinterval = 1;
      this.occurenceinstance = null;
      this.occursonday = null;

      if (this.workordertypekey) {
        this.wot = this.workordertypekey;
      } else {
        this.wot = null;

      }
      if (this.WorkorderNotes) {
        this.notes = this.WorkorderNotes;
      } else {
        this.notes = null;
      }
      if (this.FacilityKey) {

      }
      if (this.FloorKey) {


      }

      var roomsString;
      roomsString = -1;
      var facilityString;
      if (this.FacilityKey) {
        facilityString = this.FacilityKey;
      } else {
        if (facilitylistObj) {

          for (var j = 0; j < facilitylistObj.length; j++) {
            facilityList.push(facilitylistObj[j].FacilityKey);
          }
          facilityString = facilityList.join(',');
        }
      }

      var floorString;
      if (this.FloorKey) {
        floorString = this.FloorKey;
      } else {
        if (floorlistObj) {

          for (var j = 0; j < floorlistObj.length; j++) {
            floorList.push(floorlistObj[j].FloorKey);
          }
          floorString = floorList.join(',');
        }
      }

      var zoneString;
      if (this.ZoneKey) {
        zoneString = this.ZoneKey;
      } else {
        this.zone = null;
        if (zonelistObj) {

          for (var j = 0; j < zonelistObj.length; j++) {
            zoneList.push(zonelistObj[j].ZoneKey);
          }
          zoneString = zoneList.join(',');
        }
      }

      var roomtypeString;
      if (this.RoomTypeKey) {
        roomtypeString = this.RoomTypeKey;
      } else {
        if (roomtypelistObj) {

          for (var j = 0; j < roomtypelistObj.length; j++) {
            roomtypeList.push(roomtypelistObj[j].RoomTypeKey);
          }
          roomtypeString = roomtypeList.join(',');
        }
      }

      if (this.EquipmentKey) {
        this.eqp_key = this.EquipmentKey;
      } else {
        this.eqp_key = - 1;
      }
      if (this.EquipmentKey) {
        this.eqp_key = this.EquipmentKey;
      } else {

        if (EquListObj) {

          for (var j = 0; j < EquListObj.length; j++) {
            equList.push(EquListObj[j].EquipmentKey);
          }
          this.eqp_key = equList.join(',');
        }

      }


      if (this.EmployeeKey) {
        this.emp_key = this.EmployeeKey;
      } else {
        this.emp_key = - 1;
      }
      if (this.ZoneKey) {
        this.zone = this.ZoneKey;
      } else {
        this.zone = null;

      }

      if (this.PriorityKey) {
        this.priority = this.PriorityKey;
      } else {
        this.priority = - 1;
      }
      if (this.isPhotoRequired) {
        this.is_PhotoRequired = 1;
      } else {
        this.is_PhotoRequired = 0;
      }
      if (this.isBarcodeRequired) {
        this.is_BarcodeRequired = 1;
      } else {
        this.is_BarcodeRequired = 0;
      }


      this.isReccuring = false;
      this.isrecurring = 0;

      if (this.dateValue) {
        this.startDT = this.convert_DT(this.dateValue);
      } else {

        this.startDT = this.convert_DT(new Date());
      }
      this.endDT = this.startDT;
      if (this.timeValue) {
        this.workTime = this.timeValue.getHours() + ':' + this.timeValue.getMinutes();
      } else {
        this.workTime = new Date().getHours() + ':' + new Date().getMinutes();
      }

      this.workorderCreation = {
        occursontime: this.workTime,
        workorderkey: - 99,
        workordertypekey: this.wot,
        workordernote: this.notes,
        equipmentkey: this.eqp_key,
        roomkeys: roomsString,
        facilitykeys: facilityString,
        floorkeys: floorString,
        zonekeys: zoneString,
        roomtypekeys: roomtypeString,
        employeekey: this.emp_key,
        priority: this.priority,
        fromdate: this.startDT,
        todate: this.endDT,
        isbar: this.is_BarcodeRequired,
        isphoto: this.is_PhotoRequired,
        metaupdatedby: this.employeekey,
        OrganizationID: this.OrganizationID,
        intervaltype: '0', // char(1),/*d for day, w for week, m for month*/
        repeatinterval: 1,
        occursonday: null
      };
      this.WorkOrderServiceService.addWorkOrderEqup(this.workorderCreation).subscribe((data: any[]) => {
        this.deleteWO = {
          workorderkey: this.WO_Key,
          OrganizationID: this.OrganizationID
        };
        this.WorkOrderServiceService
          .deleteCurrent_WO(this.deleteWO)
          .subscribe((data: any[]) => {
            alert("Work-order updated successfully");
            this.router.navigateByUrl('/ViewWorkOrder');
          });
      });
    }
  }
  change_values() {
    if ((this.FloorKey) && (this.showEqTypes == true)) {
      this.ZoneKey = -1;
      this.RoomTypeKey = -1;
      this.RoomKey = -1;
    }
    else {
      this.ZoneKey = "";
      this.RoomTypeKey = "";
      this.RoomKey = "";
      this.EquipmentTypeKey = "";
      this.EquipmentKey = "";
    }
  }


}
