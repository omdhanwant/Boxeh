import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeCategoryPage } from './recipe-category.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeCategoryPageRoutingModule {}
