import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../service/login.service';
import { Login } from '../../../../model-class/login';

@Component({
  selector: 'app-superadmin-profile',
  templateUrl: './superadmin-profile.component.html',
  styleUrls: ['./superadmin-profile.component.scss']
})
export class SuperadminProfileComponent implements OnInit {
  profile: Login[];
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  isAuthenticated: boolean;

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
  constructor(private loginService: LoginService) { }



  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.loginService
      .getUserProfileDetails(this.employeekey, this.OrganizationID)
      .subscribe((data: Login[]) => {
        this.profile = data;
      });
  }
}
