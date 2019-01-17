import { Component, OnInit, OnChanges, Directive, HostListener, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { workorder } from '../../../model-class/work-order';
import { WorkOrderServiceService } from '../../../service/work-order-service.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { DatepickerOptions } from 'ng2-datepicker';
import { ConectionSettings } from '../../../service/ConnectionSetting';
const url = ConectionSettings.Url+'/upload_test';

@Component({
  selector: 'app-view-work-order',
  templateUrl: './view-work-order.component.html',
  styleUrls: ['./view-work-order.component.scss']
})
export class ViewWorkOrderComponent implements OnInit {
  
  loading: boolean;// loading

  pageNo: Number = 1;
  itemsPerPage: Number = 25;
  showHide1: boolean;
  showHide2: boolean;
  pagination: Number;

  searchform: FormGroup;
  regexStr = '^[a-zA-Z0-9_ ]*$';
  @Input() isAlphaNumeric: boolean;
  WorkorderDetTable;
  facilityList: workorder[];
  floorList: workorder[];
  facikey: Number;
  zoneList: workorder[];
  roomtypeList: workorder[];
  showbutton = {};
  FinishButton = [];
  RowIndex;
  countCancel1;
  myworkorder;
  countCancel;
  barcodeValue = {};
  addUrl;
  wokey: Number;
  emp: Number;
  WorkorderDate: Date;
  WorkorderDate2: Date;
  role: String;
  name: String;
  toServeremployeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  FacilityKey;
  FloorKey;
  RoomTypeKey;
  ZoneKey;
  fileName;
  result;
  submitFlag;
  BarcodeValue;


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

  public uploader: FileUploader = new FileUploader({ url: '', itemAlias: 'photo' });
  // adding properties and methods that will be used by the igxDatePicker

  public date: Date = new Date(Date.now());
  // private dayFormatter = new Intl.DateTimeFormat('en', { weekday: 'long' });
  // private monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' });

  // public formatter = (_: Date) => {
  //   return `You selected ${this.dayFormatter.format(_)}, ${_.getDate()} ${this.monthFormatter.format(_)}, ${_.getFullYear()}`;
  // }
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
    addStyle: {'font-size':'18px','width':'75%', 'border': '1px solid #ced4da','border-radius': '0.25rem'}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

  convert_DT(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  constructor(private WorkOrderServiceService: WorkOrderServiceService, private formBuilder: FormBuilder, private el: ElementRef) { }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {

      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }

  previousPage() {
    this.pageNo = +this.pageNo - 1;
    var curr_date = this.convert_DT(new Date());
    this.WorkOrderServiceService
    .getWOdetailsForEmployee(this.pageNo,this.itemsPerPage,curr_date, this.toServeremployeekey, this.OrganizationID)
    .subscribe((data: any[]) => {
      this.WorkorderDetTable = data;
        if (this.pageNo == 1) {
          this.showHide2 = true;
          this.showHide1 = false;
        } else {
          this.showHide2 = true;
          this.showHide1 = true;
        }
      });
  }

  nextPage() {
    this.pageNo = +this.pageNo + 1;
    var curr_date = this.convert_DT(new Date());
    this.WorkOrderServiceService
      .getWOdetailsForEmployee(this.pageNo,this.itemsPerPage,curr_date, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.WorkorderDetTable = data;
        this.pagination = +this.WorkorderDetTable[0].totalItems / (+this.pageNo * (+this.itemsPerPage));
        if (this.pagination > 1) {
          this.showHide2 = true;
          this.showHide1 = true;
        }
        else {
          this.showHide2 = false;
          this.showHide1 = true;
        }
      });
  }
  checktoshowFinish(i) {
    if (this.showbutton[i] == true) {
      this.showbutton[i] = true;
    } else {
      this.showbutton[i] = false;
    }
    if (this.showbutton[i] == true) {
      this.FinishButton[i] = false; // finish has to hide
    } else {
      this.FinishButton[i] = true; // finish has to show
    }
    if (this.FinishButton[i] == false) {
      return true;
    } else {
      return false;
    }
  }

  selectFloorfromBuildings(facKey) {
    this.facikey = facKey;
    this.WorkOrderServiceService
      .getallFloorNames(facKey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.floorList = data;
        this.ZoneKey='';
        this.FloorKey='';
        this.RoomTypeKey='';
      });
  }

  selectZoneRoomtypefromFloor(flkey) {
    this.WorkOrderServiceService
      .getallZones(this.facikey, flkey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.zoneList = data;
        this.ZoneKey='';
        this.RoomTypeKey='';
      });
    this.WorkOrderServiceService
      .getallRoomType(this.facikey, flkey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.roomtypeList = data;
        this.ZoneKey='';
        this.RoomTypeKey='';
      });
  }
  selectedZone(){
    this.RoomTypeKey='';
  }
  searchWO(SearchValue) {
    var value=SearchValue.trim();
    if (!this.WorkorderDate) {
      var date1 = this.convert_DT(new Date());
    }
    else {
      date1 = this.convert_DT(this.WorkorderDate);
    }
    if (!this.WorkorderDate2) {
      var date2 = date1;
    }
    else {
      date2 = this.convert_DT(this.WorkorderDate2);
    }
    if(!(this.FacilityKey)){
      this.FacilityKey=null;
    }
    if(!(this.FloorKey)){
      this.FloorKey=null;
    }
    if(!(this.ZoneKey)){
      this.ZoneKey=null;
    }
    if(!(this.RoomTypeKey)){
      this.RoomTypeKey=null;
    }
    if (value.length >= 3) {
      this.WorkOrderServiceService
        .SearchwoByEmployee(value, date1, date2, this.toServeremployeekey, this.OrganizationID, this.FacilityKey, this.FloorKey, this.RoomTypeKey, this.ZoneKey).subscribe((data: any[]) => {
          this.WorkorderDetTable = data;

        });
    }
    else if (value.length == 0) {
      if((value.length == 0) &&(SearchValue.length == 0) )
    {
   this.loading = true;
    }
      var curr_date = this.convert_DT(new Date());
      this.WorkOrderServiceService
        .getWOdetailsForEmployee(this.pageNo,this.itemsPerPage,curr_date, this.toServeremployeekey, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.WorkorderDetTable = data;
          this.loading = false;
          if (this.WorkorderDetTable[0].totalItems > this.itemsPerPage) {
            this.showHide2 = true;
            this.showHide1 = false;
          }
          else if (this.WorkorderDetTable[0].totalItems <= this.itemsPerPage) {
            this.showHide2 = false;
            this.showHide1 = false;
          }
          for (var i = 0; i < this.WorkorderDetTable.length; i++) {
            this.FinishButton[i] = true;
          }
        });
    }

  }
  viewEmployeeWorkorderByFilter() {
    this.loading = true;
    if (!this.WorkorderDate) {
      var date1 = this.convert_DT(new Date());
    }
    else {
      date1 = this.convert_DT(this.WorkorderDate);
    }
    if (!this.WorkorderDate2) {
      var date2 = date1;
    }
    else {
      date2 = this.convert_DT(this.WorkorderDate2);
    }
    if(!(this.FacilityKey)){
      this.FacilityKey=null;
    }
    if(!(this.FloorKey)){
      this.FloorKey=null;
    }
    if(!(this.ZoneKey)){
      this.ZoneKey=null;
    }
    if(!(this.RoomTypeKey)){
      this.RoomTypeKey=null;
    }
    // if(this.WorkorderDate){
    // this.WorkOrderServiceService
    //   .getworkOrderTablewithOnDateOnly(this.pageNo,this.itemsPerPage,date1, this.toServeremployeekey, this.OrganizationID)
    //   .subscribe((data: any[]) => {
    //     this.WorkorderDetTable = data;
    //     if(!this.WorkorderDate2){
    //       this.loading = false;
    //       }
    //   });
    // }
    // else{
    this.WorkOrderServiceService
      .getworkOrderTablewithOnDateandToDateFilter(date1, date2, this.toServeremployeekey, this.OrganizationID, this.FacilityKey, this.FloorKey, this.RoomTypeKey, this.ZoneKey)
      .subscribe((data: any[]) => {
        this.WorkorderDetTable = data;
        this.loading = false;
        for (var i = 0; i < this.WorkorderDetTable.length; i++) {
          this.FinishButton[i] = true;
          if(!(this.FacilityKey)){
            this.FacilityKey='';
          }
          if(!(this.FloorKey)){
            this.FloorKey='';
          }
          if(!(this.ZoneKey)){
            this.ZoneKey='';
          }
          if(!(this.RoomTypeKey)){
            this.RoomTypeKey='';
          }
        }
      });
    // }
    // else if(this.WorkorderDate && this.WorkorderDate2 && this.FacilityKey ){
    //   this.WorkOrderServiceService
    //     .getworkOrderTablewithOnDateandToDateFilter(date1, date2, this.toServeremployeekey, this.OrganizationID, this.FacilityKey, this.FloorKey, this.RoomTypeKey, this.ZoneKey)
    //     .subscribe((data: any[]) => {
    //       this.WorkorderDetTable = data;
    //       this.loading = false;
    //       for (var i = 0; i < this.WorkorderDetTable.length; i++) {
    //         this.FinishButton[i] = true;
    //       }
    //     });
    //   }
    // if(this.FacilityKey){
    // this.WorkOrderServiceService
    //   .getworkOrderTablewithbuildingFilter(date1, date2, this.toServeremployeekey, this.OrganizationID, this.FacilityKey, this.FloorKey, this.RoomTypeKey, this.ZoneKey)
    //   .subscribe((data: any[]) => {
    //     this.WorkorderDetTable = data;
    //     this.loading = false;
    //   });
    // }
  }

  workorderCompleted(i, barcodeRequired, photoRequired, workorderkey, file) {

    var t=new Date();
    var t=new Date();
    var y=t.getFullYear();
    var m=t.getMonth();
    var d=t.getDate();
    var h=t.getHours();
    var mi=t.getMinutes();
    var s=t.getSeconds();
   
         var today_DT = this.convert_DT(new Date());
      //  this.Timetemp= new Date().getHours() + ':' + new Date().getMinutes();
                   
   
    var p="";
    p=today_DT+" "+h+":"+mi+":"+s;

    this.countCancel = 1;
    this.countCancel1 = this.countCancel;
    if (!this.BarcodeValue && barcodeRequired === 1) {
      this.BarcodeValue = null;
             alert("Barcode is not provided !");
              return;
      }
    else if (this.BarcodeValue && barcodeRequired === 1) {
      this.WorkOrderServiceService
        .BarcodeRoomCheck(this.BarcodeValue, workorderkey, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.result = data;
          if (this.result === 1) {
            var type = 'manual';
            this.WorkOrderServiceService
              .BarcodeRoom(this.BarcodeValue, this.toServeremployeekey, workorderkey, type, this.OrganizationID,p)
              .subscribe((data: any[]) => {

              });
          }
        });
    }
    if (!(this.fileName) && photoRequired === 1) {
      this.fileName = null;
              alert("Photo is not provided !");
              return;
      }
   else if (this.fileName && photoRequired === 1) {
      this.WorkOrderServiceService
        .UpdatewobyPhotoForEmployee(this.fileName, this.toServeremployeekey, workorderkey, this.OrganizationID,p)
        .subscribe((data: any[]) => {
        });
    }
    if (photoRequired !== 1 && barcodeRequired !== 1) {
      this.WorkOrderServiceService
        .CompletewoByempWithoutPhotoandBarcd(this.toServeremployeekey, workorderkey, this.OrganizationID,p)
        .subscribe((data: any[]) => {
          this.FinishButton[i] = true;
        });
    }


    this.FinishButton[i] = true;
    this.showbutton[i] = false;
    this.submitFlag = false;
    this.countCancel1 = false;
    for (var j; j < this.FinishButton.length; j++) {

      this.FinishButton[i] = true;
      this.showbutton[i] = false;

    }
    var curr_date = this.convert_DT(new Date());
    this.WorkOrderServiceService
      .getWOdetailsForEmployee(this.pageNo,this.itemsPerPage,curr_date, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.WorkorderDetTable = data;
        if (this.WorkorderDetTable[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.WorkorderDetTable[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
        for (var i = 0; i < this.WorkorderDetTable.length; i++) {
          this.FinishButton[i] = true;
        }
      });
  };
  FileSelected(WorkorderKey) {
    this.addUrl = '?Workorderkey=' + WorkorderKey + '&EmployeeKey=' + this.toServeremployeekey + '&OrganizationID=' + this.OrganizationID;
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      item.url = url + this.addUrl;
    }
  }
  workorderFinish(i) {
    if (this.RowIndex || this.RowIndex === 0) {
      this.showbutton[this.RowIndex] = false;
    }
    var RowIndex;
    RowIndex = i;
    this.showbutton[RowIndex] = true;
    this.FinishButton[RowIndex] = false;
    this.countCancel1 = true;
    this.submitFlag = true;
    for (var j; j < this.FinishButton.length; j++) {
      if (i !== j) {
        this.FinishButton[i] = false;
        this.showbutton[i] = false;
      }
    }
  };
  cancelWorkorderSubmission(i) {
    if (this.RowIndex || this.RowIndex === 0) {
      this.showbutton[this.RowIndex] = false;
    }
    if (this.countCancel1 == true) {
      this.countCancel1 = false;
      var curr_date = this.convert_DT(new Date());
      this.WorkOrderServiceService
        .getWOdetailsForEmployee(this.pageNo,this.itemsPerPage,curr_date, this.toServeremployeekey, this.OrganizationID)
        .subscribe((data: any[]) => {
          this.WorkorderDetTable = data;
        });
         
  }
    this.submitFlag = false;
    this.FinishButton[i] = true;
      this.showbutton[i] = false;
  };


  ngOnInit() {

    //token starts....
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.toServeremployeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    //token ends

    this.loading = true;// loading

    this.FacilityKey="";
    this.FloorKey="";
    this.ZoneKey="";
    this.RoomTypeKey="";
    this.WorkorderDate = new Date();
    var curr_date = this.convert_DT(new Date());
    this.WorkOrderServiceService
      .getWOdetailsForEmployee(this.pageNo,this.itemsPerPage,curr_date, this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.WorkorderDetTable = data;
        this.loading = false;// loading
        if (this.WorkorderDetTable[0].totalItems > this.itemsPerPage) {
          this.showHide2 = true;
          this.showHide1 = false;
        }
        else if (this.WorkorderDetTable[0].totalItems <= this.itemsPerPage) {
          this.showHide2 = false;
          this.showHide1 = false;
        }
        for (var i = 0; i < this.WorkorderDetTable.length; i++) {
          this.FinishButton[i] = true;
        }
      });

    this.WorkOrderServiceService
      .getallBuildingsForEmployee(this.toServeremployeekey, this.OrganizationID)
      .subscribe((data: any[]) => {
        this.facilityList = data;
      });

    this.searchform = this.formBuilder.group({
      SearchWO: ['', Validators.required]
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      console.log('ImageUpload:uploaded:', item, status, response);
      this.fileName = item.file.name;

      alert('File uploaded successfully');
    };
  }

}
