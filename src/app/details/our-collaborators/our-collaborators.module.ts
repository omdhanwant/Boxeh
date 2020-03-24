import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurCollaboratorsPageRoutingModule } from './our-collaborators-routing.module';

import { OurCollaboratorsPage } from './our-collaborators.page';
import { NgxLoadingModule } from 'ngx-loading'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurCollaboratorsPageRoutingModule,
    NgxLoadingModule
  ],
  declarations: [OurCollaboratorsPage]
})
export class OurCollaboratorsPageModule {}
