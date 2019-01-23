import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../../service/organization.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-cron-job',
  templateUrl: './view-cron-job.component.html',
  styleUrls: ['./view-cron-job.component.scss']
})
export class ViewCronJobComponent implements OnInit {
  woList;
  total: Number = 0;
  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.cronJob_workordersCount().subscribe((data: any[]) => {
      this.woList = data;
      for (var i = 0; i < this.woList.length; i++) {
        this.total = this.total + this.woList[i].count;
      }
      console.log(this.total);
    });
  }

}
