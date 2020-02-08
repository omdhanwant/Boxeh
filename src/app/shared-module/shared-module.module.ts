import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './shared-services/auth.service';
import { AuthGuard } from './shared-services/auth-gaurd';
import { httpInterceptorProviders } from './shared-services/http-interceptors';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SideMenuComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    
    httpInterceptorProviders
  ],
  exports: [
    CommonModule,
    IonicModule,
    SideMenuComponent,
    HttpClientModule,
    FormsModule
  ]
})
export class SharedModule { }
