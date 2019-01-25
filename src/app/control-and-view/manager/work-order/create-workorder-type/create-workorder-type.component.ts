import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { workorder } from '../../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../../service/work-order-service.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-create-workorder-type',
  templateUrl: './create-workorder-type.component.html',
  styleUrls: ['./create-workorder-type.component.scss']
})
export class CreateWorkorderTypeComponent implements OnInit {
  add_WOT;
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  //token decoding
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


  constructor(private router: Router, private formBuilder: FormBuilder, private WorkOrderServiceService: WorkOrderServiceService, private el: ElementRef) { }

  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;
  }
  //function for creating new workordertype
  addWOT(WorkOrderTypeName) {
    if (!WorkOrderTypeName) {
      alert("Please enter work-order type!");
    } else if (!WorkOrderTypeName.trim()) {
      alert("Please enter work-order type!");
    } else {
      this.add_WOT = {
        WorkorderTypeName: WorkOrderTypeName,
        RoomTypeKey: null,
        Frequency: null,
        Repeatable: true,
        WorkorderTime: null,
        OrganizationID: this.OrganizationID,
        empkey: this.employeekey
      };
      this.WorkOrderServiceService//check if wot is already existing
        .checkforWOT(WorkOrderTypeName, this.employeekey, this.OrganizationID)
        .subscribe((data: any[]) => {
          if (data[0].count != 0) {
            alert("Work-order type already exists!");
          }
          else if (data[0].count == 0) {//if not add new wot
            this.WorkOrderServiceService.createWOT(this.add_WOT)
              .subscribe((data: any[]) => {
                alert("Work-order type created successfully");
                // this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['WorkOrderType'] } }]);
                if (this.role == 'Manager') {
                  this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['WorkOrderType'] } }]);
                }
                else if (this.role == 'Employee' && this.IsSupervisor == 1) {
                  this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['WorkOrderType'] } }]);
                }
              });
          }
        });
    }
  }
  goBack() {
    // this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['WorkOrderType'] } }]);
    if (this.role == 'Manager') {
      this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['WorkOrderType'] } }]);
    }
    else if (this.role == 'Employee' && this.IsSupervisor == 1) {
      this.router.navigate(['/SupervisorDashboard', { outlets: { Superout: ['WorkOrderType'] } }]);
    }
  }
}
