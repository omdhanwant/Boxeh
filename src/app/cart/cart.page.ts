import { Component, OnInit } from '@angular/core';
import { Cart } from '../boxeh-plans/model/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  cartData: Cart[];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor() { 
    this.cartData = null;
  }


  ionViewDidEnter() {
    if(localStorage.getItem('cart')) {
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
}
