import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactUsPageRoutingModule } from './contact-us-routing.module';

import { ContactUsPage } from './contact-us.page';
import { NgxLoadingModule } from 'ngx-loading'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactUsPageRoutingModule,
    NgxLoadingModule
  ],
  declarations: [ContactUsPage]
})
export class ContactUsPageModule {}
