import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeeklyRecipesPage } from './weekly-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: WeeklyRecipesPage
  },
  {
    path: 'recipe-blog',
    loadChildren: () => import('./recipe-blog/recipe-blog.module').then( m => m.RecipeBlogPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeklyRecipesPageRoutingModule {}
