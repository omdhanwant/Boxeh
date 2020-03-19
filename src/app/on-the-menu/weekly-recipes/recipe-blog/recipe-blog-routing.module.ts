import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeBlogPage } from './recipe-blog.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeBlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeBlogPageRoutingModule {}
