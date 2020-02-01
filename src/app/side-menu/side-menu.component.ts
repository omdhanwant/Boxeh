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
  }];

  selectedPath = '';

  constructor(private menu: MenuController, private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
      console.log(this.selectedPath);
    });
   }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  closeMenu() {
   this.menu.close();
  }

}
