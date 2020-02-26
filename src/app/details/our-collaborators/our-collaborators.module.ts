import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurCollaboratorsPageRoutingModule } from './our-collaborators-routing.module';

import { OurCollaboratorsPage } from './our-collaborators.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurCollaboratorsPageRoutingModule
  ],
  declarations: [OurCollaboratorsPage]
})
export class OurCollaboratorsPageModule {}
