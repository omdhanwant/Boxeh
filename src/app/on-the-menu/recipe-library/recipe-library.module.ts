import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeLibraryPageRoutingModule } from './recipe-library-routing.module';

import { RecipeLibraryPage } from './recipe-library.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeLibraryPageRoutingModule
  ],
  declarations: [RecipeLibraryPage]
})
export class RecipeLibraryPageModule {}
