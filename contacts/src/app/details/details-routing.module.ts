import { RouterModule, Routes } from "@angular/router";

import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: ":id",
    component: ContactDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
