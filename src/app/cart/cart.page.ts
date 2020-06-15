import { Component, OnInit } from '@angular/core';
import { Cart } from '../boxeh-plans/model/cart';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from '../shared-module/shared-services/alert-service';
import { Utils } from '../shared-module/utils/constants';
import { Error } from '../shared-module/models/Error';
import { LoginResponse } from '../shared-module/models/LoginResponse';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from './service.service';
import { Subscription } from 'rxjs';
import { paymentMethods, shippingMethods } from '../checkout/model/orderResponse';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  cartData: Cart[];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  loading = false;
  creditCard = false;
  cardType = '';
  subscription: Subscription;
  paymentMethods: paymentMethods;
  shippingMethods: shippingMethods;
  noShow: boolean;

  constructor(
    private nav: NavController,
    private route: ActivatedRoute,
    public alertService: AlertService,
    private service: Service,
  ) { 
    this.cartData = null;
    this.noShow = false;
  }


  ionViewDidEnter() {
    this.getShippingMethods();
    if(localStorage.getItem('cart')) {
      this.noShow = true;
     this.cartData = JSON.parse(localStorage.getItem('cart'));
     this.calculateTotalCartValues();
    }
  }

  // remove items from cart
  removeFromCart(index) {
    this.cartData.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartData));
    this.calculateTotalCartValues();
  }

  // cart total calculations
  calculateTotalCartValues() { 
   this.totalPrice =  this.cartData.reduce((a, b) => a + (+b.price || 0), 0);
   this.totalQuantity = this.cartData.reduce((a, b) => a + (+b.quantity || 0), 0);
  }
  
  //get shpping methods
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
