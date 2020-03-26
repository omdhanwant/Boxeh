import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { AuthService } from 'src/app/shared-module/shared-services/auth.service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { SupplierService } from './service/supplier.service';

@Component({
  selector: 'app-our-suppliers',
  templateUrl: './our-suppliers.page.html',
  styleUrls: ['./our-suppliers.page.scss'],
})
export class OurSuppliersPage implements OnInit {
  supplierData: Supplier = null;
  subscription: Subscription;
  langSubscription: Subscription;
  segment
  recipeSegment
  loading = false;

  constructor(private service: SupplierService, private alertService: AlertService, public authService: AuthService) {}

  // ionViewWillEnter() {
  //   if (!this.service.SupplierDataState) {
  //     this.loading = true;
  //   }
  // }


  ngOnInit() {
  }

  initData(event?) {

    this.langSubscription =  this.authService.$currentLanguage.subscribe(languageState => {

      // if (this.authService.LANGUAGE !== languageState) {
      //   this.loading = true;
      //   this.service.refreshState();
      // } 
      if (this.service.currentPageLanguage !== languageState) {
        this.service.currentPageLanguage = languageState
        this.loading = true;
        this.service.refreshState();
  
      } 
      
      if (this.service.SupplierDataState) {
        
        this.supplierData = this.service.SupplierDataState;
  
      } else  {
        this.subscription = this.service.getSupplier(languageState).subscribe(home => {
          if (home.code === 200) {
    
            if(event) {
              event.target.complete();
            }
            this.supplierData = home;
            // this.alertService.dismissLoading();
            this.dismissLoader();
          } else {
            this.alertService.presentAlert(Utils.ERROR, home.message, [Utils.OK]);
            // this.alertService.dismissLoading();
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
    this.loading = true;
    this.initData(event);
  }

 
  ionViewDidLeave(){
    if (this.langSubscription) this.langSubscription.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
   }

}
