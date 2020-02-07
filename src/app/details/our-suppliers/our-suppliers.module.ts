import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurSuppliersPageRoutingModule } from './our-suppliers-routing.module';

import { OurSuppliersPage } from './our-suppliers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurSuppliersPageRoutingModule
  ],
  declarations: [OurSuppliersPage]
})
export class OurSuppliersPageModule {}
