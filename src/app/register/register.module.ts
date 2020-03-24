import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { SharedModule } from '../shared-module/shared-module.module';
import { NgxLoadingModule } from 'ngx-loading'

@NgModule({
  imports: [
    RegisterPageRoutingModule,
    SharedModule,
    NgxLoadingModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
