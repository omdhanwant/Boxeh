import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { Subscription } from 'rxjs';
import { Params, ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/on-the-menu/service/recipes.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { AuthService } from 'src/app/shared-module/shared-services/auth.service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { BoxehPlansServiceService } from '../service/boxeh-plans-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage{


  productData: Product = null;
  subscription: Subscription;
  langSubscription: Subscription;
  param: Params;

  constructor(private service: BoxehPlansServiceService, private alertService: AlertService
    , public authService: AuthService, private activatedRoute: ActivatedRoute) {

      this.param = this.activatedRoute.snapshot.queryParams;
  }
 
   ionViewWillEnter() {
      this.alertService.presentLoading('Please wait...');
  }

  ionViewDidEnter() {
    this.initData();
  }

 
  initData(event?) {

    console.log(this.param.id);    
    this.langSubscription =  this.authService.$currentLanguage.subscribe(languageState => {

        this.subscription = this.service.getProductDetails(languageState, this.param.id).subscribe(product => {
          if (product.code === 200) {
    
            if(event) {
              event.target.complete();
            }
            this.productData = product;
            this.dismissLoader();
          } else {
            this.alertService.presentAlert(Utils.ERROR, product.message, [Utils.OK]);
            this.dismissLoader();
          }
        });
      
    })
  }

  dismissLoader() {
   setTimeout(() => {
      this.alertService.dismissLoading();
    }, 100); 
  }

 


  refresh(event) {
    this.alertService.presentLoading('Please wait...');
    this.initData(event);
  }


  ionViewDidLeave(){
   if (this.langSubscription) this.langSubscription.unsubscribe();
   if (this.subscription) this.subscription.unsubscribe();
  }

}
