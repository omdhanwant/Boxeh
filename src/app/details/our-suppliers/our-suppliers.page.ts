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
  segment
  recipeSegment

  constructor(private service: SupplierService, private alertService: AlertService, public authService: AuthService) {}

  ionViewWillEnter() {
    this.alertService.presentLoading('Please wait...');
  }

  ngOnInit() {
  }

  initData(event?) {
    this.subscription = this.service.getSupplier(this.authService.LANGUAGE).subscribe(home => {
      if (home.code === 200) {

        if(event) {
          event.target.complete();
        }
        this.supplierData = home;
        this.alertService.dismissLoading();
      } else {
        this.alertService.presentAlert(Utils.ERROR, home.message, [Utils.OK]);
        this.alertService.dismissLoading();
      }
    });
  }

  ionViewDidEnter() {
    this.initData();
  }

  refresh(event) {
    this.alertService.presentLoading('Please wait...');
    this.initData(event);
  }

}
