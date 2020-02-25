import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAccountPage } from './my-account.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MyAccountPage,
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'previous-orders',
        loadChildren: () => import('./previous-orders/previous-orders.module').then( m => m.PreviousOrdersPageModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAccountPageRoutingModule {}
