import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { Subscription } from 'rxjs';
import { Params, ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/on-the-menu/service/recipes.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { AuthService } from 'src/app/shared-module/shared-services/auth.service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { BoxehPlansServiceService } from '../service/boxeh-plans-service.service';
declare var $: any;

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
  loading = false;
  constructor(private service: BoxehPlansServiceService, private alertService: AlertService
    , public authService: AuthService, private activatedRoute: ActivatedRoute) {

      this.param = this.activatedRoute.snapshot.queryParams;
  }

  loadAfterDomLoad(){
    $(document).ready(function() {
      console.log("test");
      $(".single-item").on("click",function(event) {
        console.log("click");
          var target = $(event.target);
          if (target.is('input:checkbox')) return;
          
          var checkbox = $(this).find("input[type='checkbox']");
          
          if( !checkbox.prop("checked") ){
              checkbox.prop("checked",true);
          } else {
              checkbox.prop("checked",false);
          }
      });
    });
  }
 
   ionViewWillEnter() {
      this.loading = true;
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
            this.loadAfterDomLoad();
            this.dismissLoader();
          } else {
            this.alertService.presentAlert(Utils.ERROR, product.message, [Utils.OK]);
            this.dismissLoader();
          }
        });
      
    })
  }

  dismissLoader() {
  //  setTimeout(() => {
  //     this.alertService.dismissLoading();
  //   }, 100); 
  this.loading = false;
  }

 


  refresh(event) {
    this.loading = true;
    this.initData(event);
  }


  ionViewDidLeave(){
   if (this.langSubscription) this.langSubscription.unsubscribe();
   if (this.subscription) this.subscription.unsubscribe();
  }

}
