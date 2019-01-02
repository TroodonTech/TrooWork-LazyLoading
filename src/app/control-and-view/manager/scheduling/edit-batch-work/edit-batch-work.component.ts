import { Component, OnInit } from '@angular/core';
import { SchedulingService } from '../../../../service/scheduling.service';
import { ActivatedRoute, Router } from "@angular/router";

import {Location} from '@angular/common';
@Component({
  selector: 'app-edit-batch-work',
  templateUrl: './edit-batch-work.component.html',
  styleUrls: ['./edit-batch-work.component.scss']
})
export class EditBatchWorkComponent implements OnInit {
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  empName: String = null;
  empList;
  empKey: Number;
  scheduleName;
  scheduleDescription;
  scheduleNameKey$: Object;
  scheduleDetails;
  schName: String;

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

  constructor(private scheduleService: SchedulingService, private router: Router, private route: ActivatedRoute,private _location: Location) {
    this.route.params.subscribe(params => this.scheduleNameKey$ = params.scheduleNameKey);
  }

  setEmployeeForbatchSchedule(key) {
    this.empKey = key;
  }

  updateScheduleName() {
    if (!this.scheduleDetails.BatchSchduleName) {
      alert("Batch Schedule Name is not provided !");
    } else if (!this.scheduleDetails.ScheduleDescription) {
      alert("Schedule Description is not provided !");
    } else if (!this.empKey) {
      alert("Employee Name is not provided !");
    } else {
      if (this.scheduleDetails.checkBoxValue == true) {
        var scheduleDT = new Date();
        this.scheduleService
          .assignChangesForWO(scheduleDT,this.employeekey, this.OrganizationID, this.empKey, this.scheduleNameKey$, this.scheduleDetails.ScheduleDescription)
          .subscribe();
      }
      if (this.scheduleDetails.BatchSchduleName != this.schName) {
        this.scheduleService
          .checkForNewScheduleName(this.employeekey, this.OrganizationID, this.scheduleDetails.BatchSchduleName)
          .subscribe((data: any[]) => {
            if (data[0].count == 0) {
              this.scheduleService.updateScheduleNameDetails(this.employeekey, this.OrganizationID, this.scheduleDetails.BatchSchduleName, this.empKey, this.scheduleNameKey$, this.scheduleDetails.ScheduleDescription)
                .subscribe(res =>  this._location.back());
            } else {
              alert("Schedule Name already present !");
            }
          });
      } else {
        this.scheduleService.updateScheduleNameDetails(this.employeekey, this.OrganizationID, this.scheduleDetails.BatchSchduleName, this.empKey, this.scheduleNameKey$, this.scheduleDetails.ScheduleDescription)
          .subscribe(res =>  this._location.back());
      }
    }
  }
  ngOnInit() {

    //token starts....
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    //token ends

    this.scheduleService
      .getAllEmpList(this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.empList = data;
      });

    this.scheduleService
      .getScheduleDetailsbyID(this.scheduleNameKey$, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.scheduleDetails = data[0];
        this.empKey = data[0].EmployeeKey;
        this.schName = data[0].BatchSchduleName;
        this.scheduleDetails.checkBoxValue = false;
      });

  }
  goBack(){
    this._location.back();
  }
}
