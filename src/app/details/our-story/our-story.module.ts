import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurStoryPageRoutingModule } from './our-story-routing.module';

import { OurStoryPage } from './our-story.page';
import { Service } from './service.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurStoryPageRoutingModule
  ],
  declarations: [OurStoryPage],
  providers: [
    Service
  ]
})
export class OurStoryPageModule {}
