import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reports } from '../../../../model-class/reports';
import { ReportServiceService } from '../../../../service/report-service.service';
import { PieChartConfig } from '../../../../extra-files/piechart-file/Models/PieChartConfig';
import { GooglePieChartService } from '../../../../extra-files/piechart-file/Services/google-pie-chart.service';
declare var google: any;
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-dashboard-report',
  templateUrl: './dashboard-report.component.html',
  styleUrls: ['./dashboard-report.component.scss']
})
export class DashboardReportComponent implements OnInit {
  // @Input() data1: any[];
  // @Input() config1: PieChartConfig;
  // @Input() elementId1: String;
  loading: boolean;// loading
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
  //new date picker
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
    addStyle: { 'font-size': '18px', 'width': '156%',  'border': '1px solid #ced4da', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

  title = 'Reusable charts sample';
  public arr: Array<any> = [{}];
  public samplearr: Array<any> = [{}];
  public convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  // adding properties and methods that will be used by the igxDatePicker

  public date: Date = new Date(Date.now());

  // private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long' });
  // private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });

  // public formatter = (_: Date) => {
  //   return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
  // }
  //export to pdf
  public captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('DashboardReport.pdf'); // Generated PDF   
    });
  }
  employeeoption: Reports[];
  dashboardreport: FormGroup;
  workordertypeoption: Reports[];
  reporttable: Reports[];
  pievalues: Reports[];
  filterbypie: Reports[];
  data1: any[];
  data3: any[];
  sampledata1: any[];
  sampledata2: any[];
  data4: any[];
  finalStringForPie: String;
  config1: PieChartConfig;
  elementId1: String;
  dropdownSettings = {};
  em_Key: number;
  Workorder_TypeKey: string;
  date1: string;
  date2: string;
  org_id: number;
  manager;
  EmployeeKey;
  fromdate: Date;
  todate: Date;
  WorkorderTypeKey = [];
  showElement: boolean;
  constructor(private fb: FormBuilder, private ReportServiceService: ReportServiceService, private _pieChartService: GooglePieChartService) {
    this.dashboardreport = fb.group({
      EmployeeKey: ['', Validators.required],
      EmployeeText: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.loading = true;
    this.EmployeeKey = "";
    this.fromdate = new Date();

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    var dateTemp_1 = this.convert_DT(new Date());
    var dateTemp_2 = this.convert_DT(new Date());
    this.ReportServiceService
      .getallemployee(this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.employeeoption = data;
      });
    this.ReportServiceService
      .getallworkordertype(this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.workordertypeoption = data;
      });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'WorkorderTypeKey',
      textField: 'WorkorderTypeText',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.em_Key = null;
    this.Workorder_TypeKey = null;
    this.ReportServiceService
      .getdashboardreport(dateTemp_1, dateTemp_2, this.em_Key, this.Workorder_TypeKey, this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.reporttable = data;
        this.loading = false;
      });

    this.ReportServiceService
      .getpievalues(dateTemp_1, this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.pievalues = data;
        this.sampledata1 = [['WorkorderStatus', 'count']];

        for (var i = 0; i < this.pievalues.length; i++) {

          var status = this.pievalues[i].reportpietext;
          var num = this.pievalues[i].totalItems;
          this.data4 = ([status, num]);
          this.sampledata1.push(this.data4);
        }
        this.data1 = this.sampledata1;
        this.config1 = new PieChartConfig(' ', 0.4);
        this.elementId1 = 'piechart';
        setTimeout(() => {
          if (this.reporttable.length > 0) {
            this._pieChartService.BuildPieChart(this.elementId1, this.data1, this.config1);
          }
        }, 1000)

      });
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  dashboardreportbyfilter() {
    this.pievalues = [];
    this.reporttable = [];
    this.loading = true;

    if (!this.EmployeeKey) {
      this.em_Key = null;
    }
    else {
      this.em_Key = this.EmployeeKey;
    }
    if (!this.fromdate) {
      var date1 = this.convert_DT(new Date());
    }
    else {
      date1 = this.convert_DT(this.fromdate);
    }
    if (!this.todate) {
      var date2 = date1;
    }
    else {
      date2 = this.convert_DT(this.todate);
    }
    if (date2 && date1 > date2) {
      alert("Please check your Start Date!");
    }

    this.manager = this.employeekey;
    if (this.WorkorderTypeKey.length == 0) {
      workordertypeString = null;
    }
    else {

      var workordertypeList = [];
      var workordertypeListObj = this.WorkorderTypeKey;
      var workordertypeString;
      if (workordertypeListObj.length > 0) {
        if (workordertypeListObj) {
          for (var j = 0; j < workordertypeListObj.length; j++) {
            workordertypeList.push(workordertypeListObj[j].WorkorderTypeKey);
          }
        }
        workordertypeString = workordertypeList.join(',');
      }
    }
    this.ReportServiceService
      .getdashboardreport(date1, date2, this.em_Key, workordertypeString, this.employeekey, this.OrganizationID)
      .subscribe((data: Reports[]) => {
        this.reporttable = data;
        this.loading = false;
      });
    this.ReportServiceService
      .getvaluesfilterbypie(date1, date2, this.em_Key, workordertypeString, this.OrganizationID, this.employeekey)
      .subscribe((data: Reports[]) => {
        this.pievalues = data;
        this.sampledata2 = [['WorkorderStatus', 'count']];

        for (var i = 0; i < this.pievalues.length; i++) {
          var status = this.pievalues[i].reportpietext;
          var num = this.pievalues[i].totalItems;
          this.data3 = ([status, num]);
          this.sampledata2.push(this.data3);

          if ((i == this.pievalues.length - 1) && (this.sampledata2.length == this.pievalues.length + 1)) {

            setTimeout(() => {
              if ((this.pievalues.length > 0)) {
                this.data1 = this.sampledata2;
                this.config1 = new PieChartConfig(' ', 0.4);
                this.elementId1 = 'piechart';
                this._pieChartService.BuildPieChart(this.elementId1, this.data1, this.config1);
              }
            }, 1000)
          }
        }
      });
  }
}


