import { Component, OnInit } from '@angular/core';
import { People } from '../../../../model-class/People';
import { PeopleServiceService } from '../../../../service/people-service.service';
import { ActivatedRoute, Router } from "@angular/router";
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-meeting-training-edit',
  templateUrl: './meeting-training-edit.component.html',
  styleUrls: ['./meeting-training-edit.component.scss']
})
export class MeetingTrainingEditComponent implements OnInit {
  jobTitle: People[];
  empList: People[];
  event: People[];
  supervisor: People[];
  dropdownSettings1 = {};
  eventKey$: Object;
  actionKey$: Object;
  Employee = [];
  superVsrKey: Number = 0;
  jobTleKey: Number = 0;
  mtngDetails;
  Empselected: People[];
  ActionKey: Number;
  mtngDate: Date;
  time1: any;
  time2: any;

  role: String;
  name: String;
  employeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  timeValue1;
  timeValue2;
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


  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  to24Hour(str) {
    var tokens = /([10]?\d):([0-5]\d) ([ap]m)/i.exec(str);
    if (tokens === null) {
      return null;
    }
    if (tokens[3].toLowerCase() === 'pm' && tokens[1] !== '12') {
      tokens[1] = '' + (12 + (+tokens[1]));
    } else if (tokens[3].toLowerCase() === 'am' && tokens[1] === '12') {
      tokens[1] = '00';
    }
    return tokens[1] + ':' + tokens[2];
  }
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    //locale: frLocale,
    //minDate: new Date(Date.now()), // Minimal selectable date
    //maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: '', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {'font-size':'18px','width':'99%', 'border': '1px solid #ced4da','border-radius': '0.25rem'}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };


  constructor(private peopleServ: PeopleServiceService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.eventKey$ = params.EventKey);
    this.route.params.subscribe(params => this.actionKey$ = params.ActionKey);
  }
  setActionKey(actionKey) {
    this.ActionKey = actionKey;
  }
  selectEmpsDropDown() {
    if ((this.jobTleKey > 0) && (this.superVsrKey > 0)) {
      this.peopleServ
        .getSupervisorJobtitleEmployeesList(this.jobTleKey, this.superVsrKey, this.employeekey, this.OrganizationID)
        .subscribe((data: People[]) => {
          this.Employee = data;
        });
    } else if ((this.jobTleKey > 0) && (this.superVsrKey == 0)) {
      this.peopleServ
        .getJobtitleEmployeesList(this.jobTleKey, this.employeekey, this.OrganizationID)
        .subscribe((data: People[]) => {
          this.Employee = data;
        });
    }
    else if ((this.jobTleKey == 0) && (this.superVsrKey > 0)) {
      this.peopleServ
        .getSupervisorEmployeesList(this.superVsrKey, this.employeekey, this.OrganizationID)
        .subscribe((data: People[]) => {
          this.Employee = data;
        });
    }
    else if ((this.jobTleKey == 0) && (this.superVsrKey == 0)) {
      this.Employee = [];
    }

  }

  selectEmpOfJobTitle(jobKey) {
    this.jobTleKey = jobKey;
    console.log(this.jobTleKey + "jobTleKey");
    this.selectEmpsDropDown();
  }
  selectEmpOfSupervisor(supervisorKey) {
    this.superVsrKey = supervisorKey;
    console.log(this.superVsrKey + "supervisorKey");
    this.selectEmpsDropDown();
  }

  updateMeetingTrainingEvent(ActionKey, Eventhost, Venue, MeetingNotes) {
    if (!this.time1) {
      alert("Start Time is not provided");
    }
    else if (!this.time2) {
      alert("End Time is not provided");
    }
    else {
      var time1 = new Date(this.time1);
      var time2 = new Date(this.time2);
      var timediff = +time2 - +time1;
      if (timediff < 0) {
        alert("Start Time can't be after End Time");
      }
    }

    if (!ActionKey) {
      alert("Select  meeting/training/event to continue");
    }
    else if (!Eventhost) {
      alert("Event host is not provided");
    }
    else if (!Venue) {
      alert("Venue is not provided");
    }

    else if (this.Employee.length == 0) {
      alert("Employee is not selected");
    }
    else {

      if (!this.mtngDate) {
        var newDate = this.convert_DT(new Date());
      }
      else {
        newDate = this.convert_DT(this.mtngDate);
      }


      var EmployeeKeyString;
      if (this.Employee.length == 0) {
        EmployeeKeyString = null;
      }
      else {
        var employeeKeList = [];
        var employeeKeListObj = this.Employee;
        if (employeeKeListObj.length > 0) {
          if (employeeKeListObj) {
            for (var j = 0; j < employeeKeListObj.length; j++) {
              employeeKeList.push(employeeKeListObj[j].EmployeeKey);
            }
          }
          EmployeeKeyString = employeeKeList.join(',');
        }
      }
      var q = this.time1.getHours();
      var q1 = this.time1.getMinutes();
      var newTime = q + ":" + q1;

      var q2 = this.time2.getHours();
      var q3 = this.time2.getMinutes();
      var newTime1 = q2 + ":" + q3;

      this.peopleServ
        .updateMeetingTraining(ActionKey, Eventhost, Venue, newTime, newTime1, MeetingNotes, EmployeeKeyString, newDate, this.eventKey$, this.employeekey, this.OrganizationID)
        .subscribe(res => this.router.navigateByUrl('/MeetingTrainingView'));
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
    this.peopleServ
      .getJobTitleList(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.jobTitle = data;
      });

    this.peopleServ
      .getallEmployeesList(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.empList = data;
      });

    this.peopleServ
      .getSupervisorList(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.supervisor = data;
      });

    this.peopleServ
      .getallEventList(this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.event = data;
      });



    this.peopleServ
      .getMeetingTrainingDetails(this.eventKey$, this.actionKey$, this.employeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.mtngDetails = data[0];
        this.mtngDate = new Date(this.mtngDetails.MeetingDate);
        var cur_time = new Date(Date.now());
        var timeValue1 = this.mtngDetails.StartTime;
        var timeValue2 = this.mtngDetails.EndTime;
        var test1 = timeValue1.split(":");
        var test2 = timeValue2.split(":");
        var start = new Date(cur_time.getFullYear(), cur_time.getMonth(), cur_time.getDate(), test1[0], test1[1], 0);
        var end = new Date(cur_time.getFullYear(), cur_time.getMonth(), cur_time.getDate(), test2[0], test2[1], 0);
        this.timeValue1 = start;
        this.timeValue2 = end;
      });

    this.peopleServ
      .getallEmpsSelected(this.eventKey$, this.actionKey$, this.employeekey, this.OrganizationID)
      .subscribe((data: People[]) => {
        this.Employee = data;
      });


    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'EmployeeKey',
      textField: 'EmployeeText',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

  }
  goBack(){
    this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['MeetingTrainingView'] } }]);
  }
}
