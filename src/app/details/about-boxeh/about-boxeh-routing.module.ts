import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutBoxehPage } from './about-boxeh.page';

const routes: Routes = [
  {
    path: '',
    component: AboutBoxehPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutBoxehPageRoutingModule {}
