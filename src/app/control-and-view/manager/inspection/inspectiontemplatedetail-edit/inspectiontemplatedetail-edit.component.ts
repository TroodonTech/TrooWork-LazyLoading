import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { InspectionService } from '../../../../service/inspection.service';
import { Inspection } from '../../../../model-class/Inspection';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inspectiontemplatedetail-edit',
  templateUrl: './inspectiontemplatedetail-edit.component.html',
  styleUrls: ['./inspectiontemplatedetail-edit.component.scss']
})
export class InspectiontemplatedetailEditComponent implements OnInit {
  role: String;
  name: String;
  toServeremployeekey: Number;
  IsSupervisor: Number;
  OrganizationID: Number;
  pageNo: Number = 1;
  itemsPerPage: Number = 25;

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

  tempID;
  fieldArray;
  scores;
  TemplateEditDetails;
  newAttribute= [];
  temparray = [];
  insertObj;

  constructor(private route: ActivatedRoute, private inspectionService: InspectionService, private router: Router) {
    this.route.params.subscribe(params => this.tempID = params.TemplateID);
  }

  customTrackBy(index: number, obj: any): any {
    return index;
}
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
    this.inspectionService
      .scoringtype(this.OrganizationID).subscribe((data: any[]) => {

        this.scores = data;
      });
    this.inspectionService
      .getTemplateEditDetails(this.tempID, this.OrganizationID).subscribe((data: any[]) => {

        this.TemplateEditDetails = data[0];
      });
    this.inspectionService
      .getTemplateQuestionsEditDetails(this.tempID, this.OrganizationID).subscribe((data: any[]) => {

        this.fieldArray = data;
      });

  }
  addFieldValue() {
    this.newAttribute.push('');
  }
  addtempId(tempKeys) {
    this.temparray.push(tempKeys);
  }
  deleteFieldValue(TemplateQuestionID) {
    this.inspectionService
      .deleteSelectedTemplateQuestion(TemplateQuestionID, this.OrganizationID).subscribe(() => {
        this.inspectionService
          .getTemplateQuestionsEditDetails(this.tempID, this.OrganizationID).subscribe((data: any[]) => {
            this.fieldArray = data;
          });

      });
  }
  deleteNewFieldValue(index) {
    this.newAttribute.splice(index, 1);
  }
  savetemplate() {
    var temp_updateArry = this.fieldArray;
    var temp_insertArry = this.newAttribute;
    var temp_TemplateQuestionID;
    var temp_Question;
    this.temparray;

    for (var j = 0; j < this.temparray.length; j++) {
      for (var i = 0; i < temp_updateArry.length; i++) {
        if (this.temparray[j] === temp_updateArry[i].TemplateQuestionID) {
          temp_TemplateQuestionID = temp_updateArry[i].TemplateQuestionID;
          temp_Question = temp_updateArry[i].Question;
        }
      }
      this.insertObj = {
        templateid: temp_TemplateQuestionID,
        questionid: temp_Question,
        empkey: this.toServeremployeekey,
        OrganizationID: this.OrganizationID
      };
      this.inspectionService
        .updateEditedTemplateQuestion(this.insertObj).subscribe(() => {

        });

    }
    for (var j = 0; j < temp_insertArry.length; j++) {

      this.insertObj = {
        templateid: this.tempID,
        questionid: temp_insertArry[j],
        empKey: this.toServeremployeekey,
        OrganizationID: this.OrganizationID
      };

      this.inspectionService
        .insertEditedTemplateQuestion(this.insertObj).subscribe(() => {

        });
    }
    this.inspectionService
      .updateTemplateDetails(this.TemplateEditDetails.TemplateName, this.tempID, this.OrganizationID, this.TemplateEditDetails.ScoreTypeKey).subscribe(() => {
        alert("Successfully Updated");
        this.router.navigateByUrl('InspectiontemplateEdit');
      });

  }

}
