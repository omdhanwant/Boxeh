import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './shared-services/auth.service';
import { AuthGuard } from './shared-services/auth-gaurd';
import { httpInterceptorProviders } from './shared-services/http-interceptors';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    httpInterceptorProviders
  ]
})
export class SharedModule { }
