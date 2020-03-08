import { Component, OnInit, OnDestroy } from '@angular/core';
import {  MenuController, NavController } from '@ionic/angular';
import { AuthService } from '../shared-services/auth.service';
import { User } from '../models/User';
import { AlertService } from '../shared-services/alert-service';
import { Utils } from '../utils/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit , OnDestroy{

  pages = [];
  user: User;

  isLoggedIn: boolean;
  userSubscription: Subscription;

constructor(private menu: MenuController, private auth: AuthService, private alertService: AlertService, private nav: NavController) {
  }

ngOnInit() {
  this.userSubscription =  this.auth.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        this.isLoggedIn = true;
      } else {
        this.user = null;
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
    pageName: 'The Boxeh Way',
    url: '/boxeh-way',
    icon: '',
    isDropDown: false,
    isDisabled: false
},
  {
    pageName: 'About',
    open: false,
    icon: 'paper',
    isDropDown: true,
    isDisabled: false,
    children : [
      {
        pageName: 'Our Story',
        url: '/our-story',
        icon: ''
      },
      // {
      //   pageName: 'Our Story',
      //   url: '/our-story',
      //   icon: ''
      // },
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

customActionSheetOptions: any = {
  // header: 'Colors',
  subHeader: 'Select your language'
};

ngOnDestroy() {
  this.userSubscription.unsubscribe();
}

openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

// language change detection
languageChange($event) {
  this.auth.currentLanguage = $event.target.value;
  // this.nav.navigateForward('/home');
}

closeMenu() {
   this.menu.close();
  }

  logout() {
    this.auth.logout();
    this.alertService.presentAlert(Utils.SUCCESS , 'Successfully logged out!' , [Utils.OK]);
    this.nav.navigateBack('/home');
  }

}
