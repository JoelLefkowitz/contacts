import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./material.module";
import { NgMicroInteractModule } from "ng-micro-interact";
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgMicroInteractModule
  ],
  exports: [MaterialModule, FlexLayoutModule, NgMicroInteractModule]
})
export class SharedModule { }
