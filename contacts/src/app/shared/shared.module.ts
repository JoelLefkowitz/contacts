import { CommonModule } from '@angular/common';
import {FabComponent} from "./fab/fab.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./material.module";
import { NgMicroInteractModule } from "ng-micro-interact";
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [FabComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NgMicroInteractModule
  ],
  exports: [MaterialModule, FlexLayoutModule, NgMicroInteractModule, FabComponent]
})
export class SharedModule { }
