import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxehChefsPageRoutingModule } from './boxeh-chefs-routing.module';

import { BoxehChefsPage } from './boxeh-chefs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoxehChefsPageRoutingModule
  ],
  declarations: [BoxehChefsPage]
})
export class BoxehChefsPageModule {}
