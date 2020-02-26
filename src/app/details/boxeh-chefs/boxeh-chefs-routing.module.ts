import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxehChefsPage } from './boxeh-chefs.page';

const routes: Routes = [
  {
    path: '',
    component: BoxehChefsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoxehChefsPageRoutingModule {}
