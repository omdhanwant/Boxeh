import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyRecipesPageRoutingModule } from './weekly-recipes-routing.module';

import { WeeklyRecipesPage } from './weekly-recipes.page';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklyRecipesPageRoutingModule,
    NgxLoadingModule
  ],
  declarations: [WeeklyRecipesPage]
})
export class WeeklyRecipesPageModule {}
