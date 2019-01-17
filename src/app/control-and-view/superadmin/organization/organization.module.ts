import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import { ViewOrganizationComponent } from './view-organization/view-organization.component';
import { EditOrganizationComponent } from './edit-organization/edit-organization.component';
import { ManualCronJobComponent } from './manual-cron-job/manual-cron-job.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateOrganizationComponent, ViewOrganizationComponent, EditOrganizationComponent, ManualCronJobComponent]
})
export class OrganizationModule { }
