import { CommonModule } from '@angular/common';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { SearchModule } from '../search/search.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ContactCardComponent, DashboardComponent],
  imports: [
    CommonModule, HomeRoutingModule, SharedModule, SearchModule
   ]
})
export class HomeModule { }
