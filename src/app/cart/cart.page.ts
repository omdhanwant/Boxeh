import { Component, OnInit } from '@angular/core';
import { Cart } from '../boxeh-plans/model/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartData: Cart[];
  constructor() { 
    this.cartData = null;
  }

  ngOnInit() {
  }


  removeFromCart(index) {

  }

  calculateTotalCartValues() {

  }


  ionViewDidEnter() {
    if(localStorage.getItem('cart')) {
     this.cartData = JSON.parse(localStorage.getItem('cart'));
      
    }
   
  }
}
