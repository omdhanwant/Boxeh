import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxehPlansPageRoutingModule } from './boxeh-plans-routing.module';

import { BoxehPlansPage } from './boxeh-plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoxehPlansPageRoutingModule
  ],
  declarations: [BoxehPlansPage]
})
export class BoxehPlansPageModule {}
