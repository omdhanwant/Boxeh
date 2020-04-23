import { Component, OnInit } from '@angular/core';
import { Service } from './service.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../shared-module/shared-services/auth.service';

@Component({
  selector: 'app-recipe-library',
  templateUrl: './recipe-library.page.html',
  styleUrls: ['./recipe-library.page.scss'],
})
export class RecipeLibraryPage implements OnInit {
  RecipeLibrary: RecipeLibrary = null;
  subscription: Subscription;
  langSubscription: Subscription;
  searchString: string
  loading = false;
  constructor(private service: Service, public authService: AuthService, private alertService: AlertService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getBackground(image) {
      return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }
  
  initData(event?) {
    this.langSubscription =  this.authService.$currentLanguage.subscribe(languageState => {

      // if (this.authService.LANGUAGE !== languageState) {
      //   this.alertService.presentLoading('Please wait...');
      //   this.service.refreshState();
      // } 
      if (this.service.currentPageLanguage !== languageState) {
        this.service.currentPageLanguage = languageState
        // this.alertService.presentLoading('Please wait...');
        this.loading = true;
        this.service.refreshState();
  
      } 

      if (this.service.RecipeLibraryDataState) {
        this.RecipeLibrary = this.service.RecipeLibraryDataState;
        localStorage.setItem('categoryProducts', JSON.stringify(this.RecipeLibrary.data.secion_recipes.recipes_list));
      } else  {
        this.subscription = this.service.getRecipeLibrary(languageState).subscribe(responseData => {
          if (responseData.code === 200) {
    
            if(event) {
              event.target.complete();
            }
            this.RecipeLibrary = responseData;
            localStorage.setItem('categoryProducts', JSON.stringify(this.RecipeLibrary.data.secion_recipes.recipes_list));
            this.dismissLoader();
          } else {
            this.alertService.presentAlert(Utils.ERROR, responseData.message, [Utils.OK]);
            this.dismissLoader();
          }
        } ,(error) => {
          this.dismissLoader();
          this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
        });
      }
     
    })
  }

  dismissLoader() {
    this.loading = false;
    // setTimeout(() => {
    //   this.alertService.dismissLoading();
    // }, 100); 
  }

  ionViewDidEnter() {
    this.initData();
  }


  refresh(event) {
    this.service.refreshState(); // refresh state
    // this.alertService.presentLoading('Please wait...');
    this.loading = true;
    this.initData(event);
  }
  
  ionViewDidLeave(){
    if (this.langSubscription) this.langSubscription.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
   }
}
