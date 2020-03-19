import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeBlogPageRoutingModule } from './recipe-blog-routing.module';

import { RecipeBlogPage } from './recipe-blog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeBlogPageRoutingModule
  ],
  declarations: [RecipeBlogPage]
})
export class RecipeBlogPageModule {}
