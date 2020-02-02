import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutBoxehPageRoutingModule } from './about-boxeh-routing.module';

import { AboutBoxehPage } from './about-boxeh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutBoxehPageRoutingModule
  ],
  declarations: [AboutBoxehPage]
})
export class AboutBoxehPageModule {}
