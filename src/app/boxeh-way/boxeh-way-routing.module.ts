import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxehWayPage } from './boxeh-way.page';

const routes: Routes = [
  {
    path: '',
    component: BoxehWayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoxehWayPageRoutingModule {}
