import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../shared-module/shared-services/alert-service';
import { Utils } from '../../shared-module/utils/constants';
import { Error } from '../../shared-module/models/Error';
import { LoginResponse } from '../../shared-module/models/LoginResponse';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../service.service';
import { Cart } from '../../boxeh-plans/model/cart';
import { orderResponse, shippingMethods } from '../model/orderResponse';
import { paymentResponse } from '../model/paymentResponse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-received',
  templateUrl: './order-received.page.html',
  styleUrls: ['./order-received.page.scss'],
})
export class OrderReceivedPage implements OnInit {
  loading = false;
  orderReceived: orderResponse;
  paymentResponse: paymentResponse;
  subscription: Subscription;0;
  shippingMethods: shippingMethods;
  
  constructor(
    private nav: NavController,
    private route: ActivatedRoute,
    public alertService: AlertService,
    private service: Service, ) {

  }
  ionViewDidEnter() {
    if(localStorage.getItem('orderReceived') || localStorage.getItem('paymentResponse')) {
     this.orderReceived = JSON.parse(localStorage.getItem('orderReceived'));
     this.paymentResponse = JSON.parse(localStorage.getItem('paymentResponse'));
     this.getShippingMethods()
    }
  }

  ngOnInit() {
  }
  getShippingMethods(event?) {
    this.loading = true;
    this.subscription = this.service.getShippingMethods().subscribe(methods => {
      if (methods.code === 200) {
        this.shippingMethods = methods;
        this.loading = false;
      } else {
        this.alertService.presentAlert(Utils.ERROR, methods.message, [Utils.OK]);
        this.loading = false;
      }
    }, (error) => {
      this.loading = false;
      this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
    });
  }
}
