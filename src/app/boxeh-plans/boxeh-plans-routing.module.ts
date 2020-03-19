import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxehPlansPage } from './boxeh-plans.page';
import { AuthGuard } from '../shared-module/shared-services/auth-gaurd';

const routes: Routes = [
  {
    path: '',
    component: BoxehPlansPage
  },
  {
    path: 'product-details',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoxehPlansPageRoutingModule {}
