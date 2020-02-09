import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { AuthService } from '../shared-services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  pages = [];

isLoggedIn: boolean;

constructor(private menu: MenuController, private auth: AuthService) {
  }

ngOnInit() {
   this.auth.currentUser.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }


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
      isDisabled: !this.isLoggedIn
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
    pageName: 'On The Menu',
    open: false,
    icon: '',
    isDropDown: true,
    isDisabled: false,
    children : [
      {
        pageName: 'Weekly Recipes',
        url: '/weekly-recipes',
        icon: ''
      },
      {
        pageName: 'Recipe Library',
        url: '/recipe-library',
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
      isDisabled: this.isLoggedIn
  },
  {
    pageName: 'My Account',
    url: '/my-account',
    icon: 'contact',
    isDropDown: false,
    isDisabled: !this.isLoggedIn
  },
  {
    pageName: 'Contact Us',
    url: '/contact-us',
    icon: 'call',
    isDropDown: false,
    isDisabled: false
  },
];
    });
  }

openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

closeMenu() {
   this.menu.close();
  }

  logout() {
    this.auth.logout();
    
  }

}
