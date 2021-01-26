import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchConfigComponent } from './search-config/search-config.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchBarComponent, SearchConfigComponent],
  imports: [
    CommonModule, SharedModule, FormsModule, ReactiveFormsModule
  ], 
  exports: [SearchBarComponent, SearchConfigComponent]
})
export class SearchModule { }
