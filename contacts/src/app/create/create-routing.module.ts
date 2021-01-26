import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import {StepperComponent} from "./stepper/stepper.component";

const routes: Routes = [
  {
    path: "",
    component: StepperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutingModule {}
