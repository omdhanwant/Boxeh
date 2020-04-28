import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from '../shared-module/shared-services/alert-service';
import { Utils } from '../shared-module/utils/constants';
import { Error } from '../shared-module/models/Error';
import { LoginResponse } from '../shared-module/models/LoginResponse';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from './service.service';
import { Cart } from '../boxeh-plans/model/cart';
import { orderResponse, paymentMethods } from './model/orderResponse';
import { Subscription } from 'rxjs';

// interface createOrderResponse {
//   into: string,
//   status: any,
//   message: string
// }

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  // form:{
  //   first_name:null,
  //   last_name:null,
  //   address_1:null,
  //   address_2:null,
  //   city:null,
  //   state:null,
  //   postcode:null,
  //   country:null,
  //   email:null,
  //   username:null,
  //   password:null,
  //   phone:null,
  //   delivery_date:null,
  //   daypart:null,
  //   customer_note:null,
  // }
  loading = false;
  creditCard = false;
  cardType = '';
  cartData: Cart[];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  orderResponse: orderResponse;
  subscription: Subscription;
  paymentMethods: paymentMethods;
  userDetails: any;
  constructor(
    private nav: NavController,
    private route: ActivatedRoute,
    public alertService: AlertService,
    private service: Service, ) {
      this.userDetails = [];
  }

  ngOnInit() {
    if(localStorage.getItem('userDetails')){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    }
  }
  initData(event?) {
    this.loading = true;
    this.subscription = this.service.getPaymentMethods().subscribe(methods => {
      if (methods.code === 200) {
        this.paymentMethods = methods;
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

  ionViewDidEnter() {
    this.initData();
    if (localStorage.getItem('cart')) {
      this.cartData = JSON.parse(localStorage.getItem('cart'));
      this.calculateTotalCartValues();
    }
  }

  // cart total calculations
  calculateTotalCartValues() {
    this.totalPrice = this.cartData.reduce((a, b) => a + (+b.price || 0), 0);
    this.totalQuantity = this.cartData.reduce((a, b) => a + (+b.quantity || 0), 0);
  }

  checkpaymentMethod(method) {
    (method.id === 'hyperpay_applepay') ? this.creditCard = true : this.creditCard = false;
  }
  GetCardType(number) {
    console.log(number)
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
      this.cardType = 'visa'; 
      // return "Visa";

    // Mastercard 
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
      this.cardType = 'mastercard'; 
      // return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
      this.cardType = 'amex'; 
      // return "AMEX";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
      this.cardType = 'discover'; 
      // return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
      this.cardType = 'diners'; 
      // return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
      this.cardType = 'diners'; 
      // return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
      this.cardType = 'jcb'; 
      // return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
      this.cardType = 'visa'; 
      // return "Visa Electron";

    return "";
  }
  placeOrder(form: NgForm) {
    console.log(form.control.get('payment_method').value)
    if (form.valid) {
      // this.alertService.presentLoading('Please Wait...');
      const payment_method = form.control.get('payment_method').value;
      const payment_method_title = 'Cash on delivery';
      const currency = 'JOD';
      const customer_id = '0';
      const first_name = form.control.get('first_name').value;
      const last_name = form.control.get('last_name').value;
      const address_1 = form.control.get('address_1').value;
      const address_2 = form.control.get('address_2').value;
      const city = form.control.get('city').value;
      const state = form.control.get('state').value;
      const postcode = form.control.get('postcode').value;
      const country = form.control.get('country').value;
      const email = form.control.get('email').value;
      const username = form.control.get('username').value;
      const password = form.control.get('password').value;
      const phone = form.control.get('phone').value;
      const method_id = 'flat_rate';
      const method_title = 'Flat rate';
      const total = this.totalPrice + 10;
      const product_id = this.cartData[0].product_id;
      const variation_id = this.cartData[0].variation_id;
      const quantity = this.totalQuantity;
      const choosen_recipes = this.cartData[0].selectedRecipes;
      const delivery_date = form.control.get('delivery-date').value;
      const daypart = form.control.get('daypart').value;
      const customer_note = form.control.get('customer_note').value;

      const fd = new FormData();
      fd.append('payment_method', payment_method.id);
      fd.append('payment_method_title', payment_method_title);
      fd.append('currency', currency);
      fd.append('customer_id', customer_id);
      fd.append('first_name', first_name);
      fd.append('last_name', last_name);
      fd.append('address_1', address_1);
      fd.append('address_2', address_2);
      fd.append('city', city);
      fd.append('state', state);
      fd.append('postcode', postcode);
      fd.append('country', country);
      fd.append('email', email);
      fd.append('username', username);
      fd.append('password', password);
      fd.append('phone', phone);
      fd.append('method_id', method_id);
      fd.append('method_title', method_title);
      fd.append('total', total.toString());
      fd.append('product_id', product_id.toString());
      fd.append('variation_id', variation_id.toString());
      fd.append('quantity', quantity.toString());
      fd.append('choosen_recipes', choosen_recipes);
      fd.append('delivery-date', delivery_date);
      fd.append('daypart', daypart);
      fd.append('customer_note', customer_note);
      this.loading = true;
      if (payment_method.id === 'cod') {
        this.service.createOrder(fd).subscribe((response: orderResponse) => {
          this.orderResponse = response;
          localStorage.setItem('orderReceived', JSON.stringify(this.orderResponse))
          if (response.status == true) {
            form.reset();
            // this.alertService.dismissLoading();
            // localStorage.clear();
            localStorage.removeItem("cart");
            this.loading = false;
            this.alertService.presentAlert(Utils.SUCCESS, response.message, [Utils.OK]);
            this.nav.navigateForward(['/order-received'])
            // const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
            // this.nav.navigateRoot([returnUrl]);
          } else {
            // this.alertService.dismissLoading();
            this.loading = false;
            this.alertService.presentAlert(Utils.ERROR, response.message, [Utils.OK]);
          }
        }, (error) => {
          this.loading = false;
          this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
        });
      } else {
        this.service.createCCOrder().subscribe((response: orderResponse) => {
          console.log(response);
          this.loading = false;
        }, (error) => {
          this.loading = false;
          this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
        });
      }

    } else {
      // this.alertService.dismissLoading();
      this.loading = false;
      // this.alertService.presentAlert(Utils.ERROR, 'Enter valid information!', [Utils.OK]);
    }
  }

  ionViewDidLeave() {
    if (this.subscription) this.subscription.unsubscribe();
  }


}
