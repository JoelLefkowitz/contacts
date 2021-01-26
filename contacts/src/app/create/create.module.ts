import { CommonModule } from '@angular/common';
import { CreateRoutingModule } from './create-routing.module';
import { NgModule } from '@angular/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StepperComponent } from './stepper/stepper.component';

@NgModule({
  declarations: [StepperComponent],
  imports: [
    CommonModule, CreateRoutingModule, SharedModule, NgxMatFileInputModule, ReactiveFormsModule
   ]
})
export class CreateModule { }
