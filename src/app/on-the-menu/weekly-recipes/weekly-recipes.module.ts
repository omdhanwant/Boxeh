import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyRecipesPageRoutingModule } from './weekly-recipes-routing.module';

import { WeeklyRecipesPage } from './weekly-recipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklyRecipesPageRoutingModule
  ],
  declarations: [WeeklyRecipesPage]
})
export class WeeklyRecipesPageModule {}
