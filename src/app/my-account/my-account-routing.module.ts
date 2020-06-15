import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAccountPage } from './my-account.page';

const routes: Routes = [
  {
    path: '',
    component: MyAccountPage,
  },
  // {
  //   path: 'edit-account',
  //   loadChildren: () => import('./edit-account/edit-account.module').then( m => m.EditAccountPageModule)
  // },
  // {
  //   path: 'edit-address',
  //   loadChildren: () => import('./edit-address/edit-address.module').then( m => m.EditAddressPageModule)
  // },
  // {
  //   path: 'downloads',
  //   loadChildren: () => import('./downloads/downloads.module').then( m => m.DownloadsPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAccountPageRoutingModule {}
