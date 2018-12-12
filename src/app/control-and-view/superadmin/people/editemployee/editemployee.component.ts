import { Component, OnInit } from '@angular/core';
import { People } from '../../../../model-class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.scss']
})
export class EditemployeeComponent implements OnInit {

  organization: People[];
  empk$: Object;
  editempdtailsbysa;
  useroletyp;
  manager: People[];
  department: People[];
  employeestatus: People[];
  marked = true;
  jobtitle: People[];
  BirthDate: Date;
  HireDate: Date;
  delete_EmpKey: Number;
  employeedetailstable: People[];
  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  useroletype;
  roleTypeKey;
  managerList;
  showManager;
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
  managerKey: Number = 1;
  constructor(private route: ActivatedRoute, private PeopleServiceService: PeopleServiceService, private router: Router) {
    this.route.params.subscribe(params => this.empk$ = params.EmployeeKey);
  }
  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = false;
    } else {
      this.marked = true;
    }

  }
  deleteEmployee() {
   

    this.PeopleServiceService
      .DeleteEmployeeDetailsbySuperadmin(this.delete_EmpKey, this.OrganizationID, this.employeekey).subscribe(res => this.router.navigateByUrl('/Viewemployee'));
  }
  deleteEmpPass(empk$) {
    this.delete_EmpKey = empk$;
   
  }
  editEmployee(OrganizationID, UserRoleTypeKey, EmployeeNumber, ManagerKey, FirstName, LastName, MiddleName, BD, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, EmployeeStatusKey, HD, IsSupervisor, JobTitleKey, DepartmentKey, Gender) {
    if (!(EmployeeNumber) ) {
      alert("Employee Number is not provided !");
      return;
    }
    if (!(UserRoleTypeKey ) ) {
      alert("User Role Type is not provided !");
      return;
    }

    if (!(FirstName ) ) {
      alert("First Name is not provided !");
      return;
    }
    if (!(LastName ) ) {
      alert("Last Name is not provided !");
      return;
    }
    if (!(Gender) ) {
      alert("Gender is not provided !");
      return;
    }
    if (!(EmployeeStatusKey) ) {
      alert("Employee Status is not provided !");
      return;
    }
    if (!(PrimaryPhone) ) {
      alert("Primary Phone is not provided !");
      return;
    }
    if (!(HD) ) {
      alert("Hire Date is not provided !");
      return;
    }
    if (!(JobTitleKey ) ) {
      alert("Job Title is not provided !");
      return;
    }
    if (!(DepartmentKey) ) {
      alert("Department is not provided !");
      return;
    }
    var birthdt;
    var currentDate=this.convert_DT(new Date());
   
    if (!(this.BirthDate) ) {
      birthdt = this.convert_DT(new Date());
    }
    else {
      birthdt = this.convert_DT(this.BirthDate);
    }
    var hiredt= this.convert_DT(HD)
    if(birthdt > currentDate){
      alert("Wrong Birth Date !");
      return;
    }
    if(hiredt >currentDate){
      alert("Wrong Hire Date !");
      return;
    }
    if( HD <BD){
      alert("Hire Date must be greater than birth date !");
      return;
    }
   

    this.PeopleServiceService.UpdateEmployeeDetailsbySa(this.managerKey, this.empk$, this.OrganizationID, UserRoleTypeKey, EmployeeNumber, FirstName, LastName, MiddleName, birthdt, AddressLine1, City, AddressLine2, State, Country, PrimaryPhone, ZipCode, AlternatePhone, EmailID, EmployeeStatusKey, hiredt, IsSupervisor, JobTitleKey, DepartmentKey, Gender)
    .subscribe((data: any[]) => {
      alert("Successfully Updated !");
         this.router.navigateByUrl('/Viewemployee')
        });

  }
  numberValid(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  charValidation(event: any) {
    const patternChar = /[a-zA-Z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patternChar.test(inputChar)) {
      event.preventDefault();
    }
  }

  selectUserType(userType) {
    if (userType == this.roleTypeKey) {
      this.showManager = true;
      this.PeopleServiceService
        .getmanagersForEmp(this.employeekey, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.managerList = data;
        });
      console.log(this.showManager);
    } else {
      this.showManager = false;
      console.log(this.showManager);
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
    this.PeopleServiceService.EditEmployeeDetailsbySuperadmin(this.empk$, this.OrganizationID).subscribe((data: Array<any>) => {
      this.editempdtailsbysa = data[0];
      this.BirthDate = new Date(this.editempdtailsbysa.BirthDate);
      this.HireDate = new Date(this.editempdtailsbysa.HireDate);
      this.useroletype = this.editempdtailsbysa.UserRoleName;
      if (this.useroletype == "Employee") {
        this.showManager = true;
      }
    });

    this.PeopleServiceService
      .getOrganizationDDforSuprAdmin(this.OrganizationID)
      .subscribe((data: People[]) => {
       
        this.organization = data;
      });
    this.PeopleServiceService
      .getUserRoleTypesa(this.OrganizationID)       
      .subscribe((data: any[]) => {
        this.useroletyp = data;
        for (var i = 0; i < data.length; i++) {
          if (data[i].UserRoleName == "Employee") {
            this.roleTypeKey = data[i].UserRoleTypeKey;
          }
        }
      });
    this.PeopleServiceService
      .getvaluesForManagerDropdowninSA(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        
        this.manager = data;
      });
    this.PeopleServiceService
      .getDepartmentforddinSuperadmin(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
     
        this.department = data;
      });
    this.PeopleServiceService
      .getEmployeeStatusListforDropdowninSuperadmin(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
   
        this.employeestatus = data;
      });
    this.PeopleServiceService
      .getjobTitleforDropdowninSuperadmin(this.OrganizationID)
      .subscribe((data: People[]) => {
       
        this.jobtitle = data;
      });
  }

}
