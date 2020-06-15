import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousOrdersPageRoutingModule } from './previous-orders-routing.module';

import { PreviousOrdersPage } from './previous-orders.page';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviousOrdersPageRoutingModule,
    NgxLoadingModule
  ],
  declarations: [PreviousOrdersPage]
})
export class PreviousOrdersPageModule {}
