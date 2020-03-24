import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxehWayPageRoutingModule } from './boxeh-way-routing.module';

import { BoxehWayPage } from './boxeh-way.page';
import { NgxLoadingModule } from 'ngx-loading'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoxehWayPageRoutingModule,
    NgxLoadingModule
  ],
  declarations: [BoxehWayPage]
})
export class BoxehWayPageModule {}
