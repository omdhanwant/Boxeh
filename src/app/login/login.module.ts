import { NgModule } from '@angular/core';


import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SharedModule } from '../shared-module/shared-module.module';
import { NgxLoadingModule } from 'ngx-loading'

@NgModule({
  imports: [
    LoginPageRoutingModule,
    SharedModule,
    NgxLoadingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
