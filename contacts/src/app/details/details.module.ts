import { CommonModule } from '@angular/common';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { DetailsRoutingModule } from "./details-routing.module";
import { NgModule } from '@angular/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UpdateDetailsDialogComponent } from './update-details-dialog/update-details-dialog.component';

@NgModule({
  declarations: [UpdateDetailsDialogComponent, ContactDetailsComponent],
  imports: [
    CommonModule, DetailsRoutingModule, SharedModule, NgxMatFileInputModule, ReactiveFormsModule
   ]
})
export class DetailsModule { }
