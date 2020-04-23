import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { AuthService } from 'src/app/shared-module/shared-services/auth.service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { RecipesService } from '../../service/recipes.service';
import { RecipeBlog } from '../../modal/recipe.blog';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-blog',
  templateUrl: './recipe-blog.page.html',
  styleUrls: ['./recipe-blog.page.scss'],
})
export class RecipeBlogPage {

  recipeData: RecipeBlog = null;
  subscription: Subscription;
  langSubscription: Subscription;
  segment;
  recipeSegment;
  param: Params;
  loading = false;

  constructor(private service: RecipesService, private alertService: AlertService
    , public authService: AuthService, private activatedRoute: ActivatedRoute) {

      this.param = this.activatedRoute.snapshot.queryParams;
  }
 
  //  ionViewWillEnter() {
  //     // this.alertService.presentLoading('Please wait...');
  //     this.loading = true;
  // }

  ionViewDidEnter() {
    this.initData();
  }

 
  initData(event?) {

    console.log(this.param.id);    
    this.langSubscription =  this.authService.$currentLanguage.subscribe(languageState => {
        this.loading = true;
        this.subscription = this.service.getReceipe(languageState, this.param.id).subscribe(recipe => {
          if (recipe.code === 200) {
            
            if(event) {
              event.target.complete();
            }
            this.recipeData = recipe;
            this.dismissLoader();
          } else {
            this.alertService.presentAlert(Utils.ERROR, recipe.message, [Utils.OK]);
            this.dismissLoader();
          }
        });
      
    } ,(error) => {
      this.dismissLoader();
      this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
    })
  }

  dismissLoader() {
    this.loading = false;
  }

 


  refresh(event) {
    // this.alertService.presentLoading('Please wait...');
    this.loading = true;
    this.initData(event);
  }


  ionViewDidLeave(){
   if (this.langSubscription) this.langSubscription.unsubscribe();
   if (this.subscription) this.subscription.unsubscribe();
  }
}
