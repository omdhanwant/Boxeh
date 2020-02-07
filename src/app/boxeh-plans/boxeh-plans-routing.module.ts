import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxehPlansPage } from './boxeh-plans.page';

const routes: Routes = [
  {
    path: '',
    component: BoxehPlansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoxehPlansPageRoutingModule {}
