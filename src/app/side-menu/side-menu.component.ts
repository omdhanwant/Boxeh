import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { RouterEvent, Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {

  pages = [
    {
      pageName: 'Home',
      url: '/home',
      icon: 'home',
      isDropDown: false
    },
    {
      pageName: 'Login/ Register',
      url: '/login',
      icon: 'log-in',
      isDropDown: false
  },
  {
    pageName: 'My Account',
    url: '/my-account',
    open: false,
    icon: '',
    isDropDown: true,
    children : [
      {
        pageName: 'Profile',
        url: '/my-account/profile',
        icon: 'contact'
      },
      {
        pageName: 'Previous Orders',
        url: '/my-account/previous-orders',
        icon: 'card'
      },

    ]
  }
];

  constructor(private menu: MenuController) {
   }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  closeMenu() {
   this.menu.close();
  }

}
