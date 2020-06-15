import { Downloads } from './downloads.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../shared-module/shared-services/alert-service';
import { Utils } from '../../shared-module/utils/constants';
import { Error } from '../../shared-module/models/Error';
import { LoginResponse } from '../../shared-module/models/LoginResponse';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared-module/shared-services/auth.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
interface OrdersResponse{
  code: number,
  status: boolean,
  message: string,
  data:
      {
          order_id:number,
          status:  string,
          currency: string,
          total: number,
          date_created: {
              date:  string,
              timezone_type:  string,
              timezone:  string,
          },
          payment_method:  string,
      }[]
}

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.page.html',
  styleUrls: ['./downloads.page.scss'],
})
export class DownloadsPage implements OnInit {
  Orders: OrdersResponse = null;
  subscription: Subscription;
  loading = false;
  constructor(
    private downloads: Downloads,
    private nav: NavController,
    private route: ActivatedRoute,
    public alertService: AlertService,
    public authService: AuthService) {

  }

  ngOnInit() {
  }

  dismissLoader() {
    this.loading = false;
  }
  getOrders(id) {
    this.loading = true;
    let formData = new FormData();
    formData.append('user_id', id)
    this.subscription = this.downloads.getOrdersData(formData).subscribe(order => {
      if (order.code === 200) {

        this.Orders = order;
        this.dismissLoader();
      } else {
        this.Orders = order;
        // this.alertService.presentAlert(Utils.ERROR, order.message, [Utils.OK]);
        this.dismissLoader();
      }
    }, (error) => {
      this.dismissLoader();
      this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
    });
  }


  ionViewDidEnter() {
    if (localStorage.getItem('userDetails')) {
      const users = JSON.parse(localStorage.getItem('userDetails'));
      this.getOrders(users.id);
    }
  }


  refresh(event) {
    this.loading = true;
    if (localStorage.getItem('userDetails')) {
      const users = JSON.parse(localStorage.getItem('userDetails'));
      this.getOrders(users.id);
    }
  }

  ionViewDidLeave() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.alertService.presentAlert(Utils.SUCCESS , 'Successfully logged out!' , [Utils.OK]);
    this.nav.navigateBack('/home');
    localStorage.clear();
  }
}
