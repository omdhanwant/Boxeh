import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { Subscription } from 'rxjs';
import { Params, ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/on-the-menu/service/recipes.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { AuthService } from 'src/app/shared-module/shared-services/auth.service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { BoxehPlansServiceService } from '../service/boxeh-plans-service.service';
import { NavController } from '@ionic/angular';
import { Cart } from '../model/cart';
declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage{
  variation: any;
  productData: Product = null;
  subscription: Subscription;
  langSubscription: Subscription;
  param: Params;
  loading = false;
  optionsMap: Map<number, string>;
  selectedRecipes: any[];
  isExists: boolean = false;
  constructor(private service: BoxehPlansServiceService, private alertService: AlertService
    , public authService: AuthService, private activatedRoute: ActivatedRoute,
    private nav: NavController) {
      this.optionsMap = new Map<number, string>();
      this.selectedRecipes = [];
      this.param = this.activatedRoute.snapshot.queryParams;
  }
 
   ionViewWillEnter() {
      this.loading = true;
  }

  ionViewDidEnter() {
    if (this.param.recipesPerWeek && this.param.recipesPerWeek) {
      this.optionsMap.set(0, this.param.recipesPerWeek)
      this.optionsMap.set(1, this.param.servingPerRecipe)
      console.log(this.optionsMap.get(0));
      console.log(this.optionsMap.get(1));
    }
    this.isExists = false;
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
            // this.loadAfterDomLoad();
            this.dismissLoader();
          } else {
            this.alertService.presentAlert(Utils.ERROR, product.message, [Utils.OK]);
            this.dismissLoader();
          }
        } ,(error) => {
          this.dismissLoader();
          this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
        });
      
    })
  }

  dismissLoader() {
  //  setTimeout(() => {
  //     this.alertService.dismissLoading();
  //   }, 100); 
  this.loading = false;
  }

  addToCart() {
    let storeObject: Cart = {
      productId: this.productData.data.id,
      product_id: this.productData.data.id,
      variation_id: this.variation.id,
      productName: this.productData.data.name,
      recipesPerWeek: this.optionsMap.get(0),
      servingsPerRecipe: this.optionsMap.get(1),
      selectedRecipes: this.selectedRecipes.toString(),
      price: this.getPrice(),
      quantity: 1,
      totalPrice: 1 * this.getPrice()
    }
    if(localStorage.getItem('cart')) {
      let data:Cart[] = JSON.parse(localStorage.getItem('cart'));
      
      data.forEach(d => {
        if ((storeObject.recipesPerWeek === d.recipesPerWeek) && (storeObject.servingsPerRecipe === d.servingsPerRecipe)) {
            this.isExists = true;
        }
      });
      if (!this.isExists ) {
        data.push(storeObject);
        this.nav.navigateForward(['/cart']);
      }
      localStorage.setItem('cart' , JSON.stringify(data));
    } else {
      localStorage.setItem('cart' , JSON.stringify([storeObject]));
      this.nav.navigateForward(['/cart']);
    }
  }


  refresh(event) {
    this.loading = true;
    this.initData(event);
  }



  addSelectedRecipes(event) {
    if (!this.selectedRecipes.includes(event.target.value)) {
      this.selectedRecipes.push(event.target.value);
    } else {
      let index = this.selectedRecipes.findIndex(s => s == event.target.value)
       this.selectedRecipes.splice(index,1);
    }
  }


  calculateTotalPrice(event, i) {
      this.optionsMap.set(i, event.target.value);
  }

  getPrice(){
    this.variation = null;
    if (this.productData) {
      this.productData.data.variations.forEach(v => {
         if(v.attributes.filter((a, index) => a.option === this.optionsMap.get(index)).length == 2) {
           this.variation = v;
         }
      });
  
      if (this.variation) {
        return  this.variation.regular_price
     }
    }

   return 0
  }


  ionViewDidLeave(){
   if (this.langSubscription) this.langSubscription.unsubscribe();
   if (this.subscription) this.subscription.unsubscribe();
  }

}