import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OurSuppliersPage } from './our-suppliers.page';

const routes: Routes = [
  {
    path: '',
    component: OurSuppliersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurSuppliersPageRoutingModule {}
