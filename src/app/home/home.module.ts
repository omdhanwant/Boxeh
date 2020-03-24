import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SharedModule } from '../shared-module/shared-module.module';
import { NgxLoadingModule } from 'ngx-loading'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomePage
      }
    ]),
    SharedModule,
    NgxLoadingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
