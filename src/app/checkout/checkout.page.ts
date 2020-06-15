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
import { orderResponse, paymentMethods, shippingMethods } from './model/orderResponse';
import { Subscription } from 'rxjs';
import { paymentResponse } from './model/paymentResponse';
import { userResponse } from './model/userResponse';

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
  user: any = {
    first_name:null,
    last_name:null,
    address_1:null,
    address_2:null,
    city:null,
    state:null,
    postcode:null,
    country:null,
    email:null,
    username:null,
    password:null,
    phone:null,
    delivery_date:null,
    daypart:null,
    customer_note:null,
  };
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
  shippingMethods: shippingMethods;
  userResponse: userResponse;
  constructor(
    private nav: NavController,
    private route: ActivatedRoute,
    public alertService: AlertService,
    private service: Service, ) {
      this.userDetails = [];
      this.userResponse = null;
  }

  ngOnInit() {
  }
  getUserData(userID) {
    const form = new FormData();
    form.append('id', userID);
    this.loading = true;
    this.subscription = this.service.getUserData(form).subscribe(userRes => {
      if (userRes.code === 200) {
        this.userResponse = userRes;

        if(this.userResponse || this.userResponse !== null){
          console.log(this.userResponse);
          this.user = {
            first_name:this.userResponse.data.first_name,
            last_name:this.userResponse.data.last_name,
            company:this.userResponse.data.billing_company,
            address_1:this.userResponse.data.billing_address_1,
            address_2:this.userResponse.data.billing_address_2,
            city:this.userResponse.data.billing_city,
            state:this.userResponse.data.billing_state,
            postcode:this.userResponse.data.billing_postcode,
            country:this.userResponse.data.billing_country,
            email:this.userResponse.data.user_email,
            phone:this.userResponse.data.billing_phone
          };
        }
        this.loading = false;
      } else {
        this.alertService.presentAlert(Utils.ERROR, userRes.message, [Utils.OK]);
        this.loading = false;
      }
    }, (error) => {
      this.loading = false;
      this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
    });
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

  ionViewDidEnter() {
    this.initData();
    this.getShippingMethods();
    if (localStorage.getItem('cart')) {
      this.cartData = JSON.parse(localStorage.getItem('cart'));
      this.calculateTotalCartValues();
    }

    if(localStorage.getItem('userDetails')){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      console.log(this.userDetails);
      this.user.first_name = this.userDetails.first_name;
      this.user.last_name = this.userDetails.last_name;
      this.user.email = this.userDetails.email;
      this.getUserData(this.userDetails.id);
    }else{
      this.userDetails = null;
      this.userResponse = null;
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

      const payment_method = form.control.get('payment_method').value;
      const payment_method_title = (payment_method.id === 'cod') ?  'Cash on delivery' : 'Credit Card';
      const currency = 'JOD';
      const customer_id = this.userDetails ? this.userDetails.id : 0;
      const first_name = form.control.get('first_name').value;
      const last_name = form.control.get('last_name').value;
      const address_1 = form.control.get('address_1').value;
      const address_2 = form.control.get('address_2').value;
      const city = form.control.get('city').value;
      const state = form.control.get('state').value;
      const postcode = form.control.get('postcode').value;
      const country = form.control.get('country').value;
      const email = form.control.get('email').value;
      const phone = form.control.get('phone').value;
      const method_id = (this.shippingMethods.data[0].method_id) ? this.shippingMethods.data[0].method_id : 0;
      const method_title = (this.shippingMethods.data[0].method_title) ? this.shippingMethods.data[0].method_title : 'Flat Rate';
      const total = this.totalPrice + (this.shippingMethods.data[0].settings.cost.value) ? this.shippingMethods.data[0].settings.cost.value : 0;
      const product_id = this.cartData[0].productId;
      const variation_id = this.cartData[0].variation_id;
      const quantity = this.totalQuantity;
      const choosen_recipes = this.cartData[0].selectedRecipes;
      const delivery_date = form.control.get('delivery-date').value;
      const daypart = form.control.get('daypart').value;
      const customer_note = form.control.get('customer_note').value;
      const company = form.control.get('company').value;
      const set_paid = true;
      const status = 'processing';
      const fd1 = new FormData();
      fd1.append('payment_method', payment_method.id);
      fd1.append('payment_method_title', payment_method_title);
      fd1.append('currency', currency);
      fd1.append('customer_id', customer_id);
      fd1.append('first_name', first_name);
      fd1.append('last_name', last_name);
      fd1.append('address_1', address_1);
      fd1.append('address_2', address_2);
      fd1.append('city', city);
      fd1.append('state', state);
      fd1.append('postcode', postcode);
      fd1.append('country', country);
      if(this.userDetails){
        fd1.append('email', email);
      }else{
        fd1.append('email', email);
        fd1.append('username', form.control.get('username').value);
        fd1.append('password', form.control.get('password').value);
      }
      fd1.append('phone', phone);
      fd1.append('method_id', method_id.toString());
      fd1.append('method_title', method_title.toString());
      fd1.append('total', total.toString());
      fd1.append('product_id', product_id.toString());
      fd1.append('variation_id', variation_id.toString());
      fd1.append('quantity', quantity.toString());
      fd1.append('choosen_recipes', choosen_recipes);
      fd1.append('delivery-date', delivery_date);
      fd1.append('daypart', daypart);
      fd1.append('customer_note', customer_note);
      fd1.append('company', company);
      fd1.append('status', status);
      fd1.append('set_paid', set_paid.toString());
      this.loading = true;

      if (payment_method.id === 'cod') {
        this.createOrder(fd1, form);
      } else if(payment_method.id == 'hyperpay_applepay' || payment_method.id == 'hyperpay_applepay') {

        const entityId = this.paymentMethods.data[1].settings.entityId.value;
        const amount = total
        const currency = 'JOD';
        const testMode = 'EXTERNAL';
        const paymentType = 'PA';
        const paymentBrand = (this.cardType === 'visa') ? 'VISA':'VISA';
        const cardNo = form.control.get('cardNumber').value;
        const cardHolder = form.control.get('cardHolder').value;
        const expiryMonth = form.control.get('cardMonth').value;
        const expiryYear = form.control.get('cardYear').value;
        const cvv = form.control.get('cvv').value;
        const shopperResultUrl = 'http://boxeh.net/boxeh/checkout/' //form.control.get('cvv').value

        const fd = new FormData();
        fd.append('payment_method', payment_method.id);
        fd.append('entityId',entityId);
        fd.append('amount', amount.toString());
        fd.append('currency',currency);
        fd.append('testMode',testMode);
        fd.append('paymentType',paymentType);
        fd.append('paymentBrand',paymentBrand);
        fd.append('card.number',cardNo);
        fd.append('card.holder',cardHolder);
        fd.append('card.expiryMonth',expiryMonth);
        fd.append('card.expiryYear',expiryYear);
        fd.append('card.cvv', cvv);
        fd.append('shopperResultUrl', 'http://boxeh.net/boxeh/checkout/');
        this.service.createCCOrder(
          entityId, 
          amount,
          currency,
          testMode,
          paymentType,
          paymentBrand, 
          cardNo, 
          cardHolder, 
          expiryMonth, 
          expiryYear,
          cvv, 
          fd,
          shopperResultUrl
        ).subscribe((response: paymentResponse) => {
          localStorage.setItem('paymentResponse', JSON.stringify(response));
          console.log(response);
          this.loading = false;
          this.createOrder(fd1, form);
        },
         (error) => {
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


  createOrder(fd: FormData, form: NgForm) {
    this.loading = true;
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
  }

  ionViewDidLeave() {
    if (this.subscription) this.subscription.unsubscribe();
  }


}
