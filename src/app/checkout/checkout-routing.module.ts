import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutPage } from './checkout.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutPage
  },
  {
    path: 'order-received',
    loadChildren: () => import('./order-received/order-received.module').then( m => m.OrderReceivedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutPageRoutingModule {}
