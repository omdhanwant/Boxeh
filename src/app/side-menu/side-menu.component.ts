import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { RouterEvent, Router } from '@angular/router';
import { AuthService } from '../shared-module/shared-services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {

  pages = [];

  constructor(private menu: MenuController, private auth: AuthService) {
    const isLoggedIn = this.auth.currentUserValue ? true : false;
    this.pages = [
      {
        pageName: 'Home',
        url: '/home',
        icon: 'home',
        isDropDown: false,
        isDisabled: false
      },
      {
        pageName: 'Boxeh Plans',
        url: '/boxeh-plans',
        icon: '',
        isDropDown: false,
        isDisabled: !isLoggedIn
    },
    {
      pageName: 'About',
      open: false,
      icon: 'paper',
      isDropDown: true,
      isDisabled: false,
      children : [
        {
          pageName: 'About Boxeh',
          url: '/about-boxeh',
          icon: ''
        },
        {
          pageName: 'Our Story',
          url: '/our-story',
          icon: ''
        },
        {
          pageName: 'Our Suppliers',
          url: '/our-suppliers',
          icon: ''
        },
        {
          pageName: 'Our Collaborators',
          url: '/our-collaborators',
          icon: ''
        }

      ]
    },
    {
      pageName: 'Boxeh Chefs',
      open: false,
      icon: '',
      isDropDown: true,
      isDisabled: false,
      children : [
        {
          pageName: 'Boxeh Chefs',
          url: '/boxeh-chefs',
          icon: 'man'
        },
        {
          pageName: 'Join Us',
          url: '/join-us',
          icon: 'people'
        }

      ]
    },
      {
        pageName: 'Login/ Register',
        url: '/login',
        icon: 'log-in',
        isDropDown: false,
        isDisabled: isLoggedIn
    },
    {
      pageName: 'My Account',
      url: '/my-account',
      icon: 'contact',
      isDropDown: false,
      isDisabled: !isLoggedIn
    },
    {
      pageName: 'Contact Us',
      url: '/contact-us',
      icon: 'call',
      isDropDown: false,
      isDisabled: false
    }
  ];
   }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  closeMenu() {
   this.menu.close();
  }

}
