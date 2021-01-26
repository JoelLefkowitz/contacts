import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgModule } from '@angular/core';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressBarModule, 
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatToolbarModule 
];

@NgModule({  
  declarations: [],
  imports: [
    CommonModule,    
  ].concat(materialModules), 
  exports: [].concat(materialModules)
})
export class MaterialModule { }
