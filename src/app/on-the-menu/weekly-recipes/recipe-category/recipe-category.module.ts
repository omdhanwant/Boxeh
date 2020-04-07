import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeCategoryPageRoutingModule } from './recipe-category-routing.module';

import { RecipeCategoryPage } from './recipe-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeCategoryPageRoutingModule
  ],
  declarations: [RecipeCategoryPage]
})
export class RecipeCategoryPageModule {}
