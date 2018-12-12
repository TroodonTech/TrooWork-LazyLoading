import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from '../../../../service/inventory.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent implements OnInit {
  deptKey$: Object;
  dept: Array<any>;


  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;

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

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService, private router: Router) {
    this.route.params.subscribe(params => this.deptKey$ = params.DeptKey);
  }

  updateDepartment(DepartmentName) {

    if (!DepartmentName) {
      alert("Please provide a Department Name");
    } else {
      this.inventoryService.checkForNewDepartment(DepartmentName, this.employeekey, this.OrganizationID).subscribe((data: Array<any>) => {
        if (data.length > 0) {
          alert("Department already present");
        }
        else {
          this.inventoryService.UpdateDepartment(DepartmentName, this.deptKey$, this.employeekey, this.OrganizationID).subscribe(res =>{
            alert("Department updated successfully");
             this.router.navigateByUrl('/DepartmentView')
        });
        }
      });
    }
  }

  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.inventoryService.EditDepartment(this.deptKey$, this.OrganizationID).subscribe((data: Array<any>) => {

      this.dept = data[0];
    });
  }
}
