import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderReceivedPageRoutingModule } from './order-received-routing.module';

import { OrderReceivedPage } from './order-received.page';

import { NgxLoadingModule } from 'ngx-loading';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderReceivedPageRoutingModule,
    NgxLoadingModule
  ],
  declarations: [OrderReceivedPage]
})
export class OrderReceivedPageModule {}
