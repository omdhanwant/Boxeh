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
import { orderResponse } from './model/orderResponse';

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
  loading = false;
  cartData: Cart[];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  orderResponse: orderResponse;

  constructor(
    private nav: NavController,
    private route: ActivatedRoute,
    public alertService: AlertService,
    private service: Service, ) {

  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    if(localStorage.getItem('cart')) {
     this.cartData = JSON.parse(localStorage.getItem('cart'));
     this.calculateTotalCartValues();
    }
  }

   // cart total calculations
   calculateTotalCartValues() { 
    this.totalPrice =  this.cartData.reduce((a, b) => a + (+b.price || 0), 0);
    this.totalQuantity = this.cartData.reduce((a, b) => a + (+b.quantity || 0), 0);
   }

  placeOrder(form: NgForm) {
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
      const total = this.totalPrice;
      const product_id = this.cartData[0].product_id;
      const variation_id = this.cartData[0].variation_id;
      const quantity = this.totalQuantity;
      const choosen_recipes = this.cartData[0].selectedRecipes;
      const delivery_date = form.control.get('delivery-date').value;
      const daypart = form.control.get('daypart').value;
      const customer_note = form.control.get('customer_note').value;

      const fd = new FormData();
      fd.append('payment_method', payment_method);
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
      this.service.createOrder(fd).subscribe((response:orderResponse) => {
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
      } ,(error) => {
        this.loading = false;
        this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
      });

    } else {
      // this.alertService.dismissLoading();
      this.loading = false;
      // this.alertService.presentAlert(Utils.ERROR, 'Enter valid information!', [Utils.OK]);
    }
  }
}
