import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeLibraryPage } from './recipe-library.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeLibraryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeLibraryPageRoutingModule {}
