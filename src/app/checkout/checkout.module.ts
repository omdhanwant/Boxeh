import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { CheckoutPage } from './checkout.page';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    NgxLoadingModule
  ],
  declarations: [CheckoutPage]
})
export class CheckoutPageModule {}
