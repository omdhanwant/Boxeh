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
      url: '/home'
    },
    {
      pageName: 'Login/ Register',
      url: '/login'
  },
  {
    pageName: 'My Account',
    url: '/my-account'
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
