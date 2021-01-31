import { CommonModule } from '@angular/common';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { DetailsRoutingModule } from "./details-routing.module";
import { NgModule } from '@angular/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UpdateNameDialogComponent } from './update-name-dialog/update-name-dialog.component';
import { UpdatePhoneNumberDialogComponent } from './update-phone-number-dialog/update-phone-number-dialog.component';
import { UpdateIconDialogComponent } from './update-icon-dialog/update-icon-dialog.component';

@NgModule({
  declarations: [ContactDetailsComponent, UpdateNameDialogComponent, UpdatePhoneNumberDialogComponent, UpdateIconDialogComponent],
  imports: [
    CommonModule, DetailsRoutingModule, SharedModule, NgxMatFileInputModule, ReactiveFormsModule
   ]
})
export class DetailsModule { }
