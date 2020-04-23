import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxehChefsPageRoutingModule } from './boxeh-chefs-routing.module';

import { BoxehChefsPage } from './boxeh-chefs.page';
import { NgxLoadingModule } from 'ngx-loading'
import { FilterPipeSearch } from 'src/app/directives/filterPipeSearch';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoxehChefsPageRoutingModule,
    NgxLoadingModule
  ],
  declarations: [BoxehChefsPage, FilterPipeSearch]
})
export class BoxehChefsPageModule {}
