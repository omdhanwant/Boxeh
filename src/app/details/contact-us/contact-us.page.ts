import { Contact } from './contact.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../shared-module/shared-services/alert-service';
import { Utils } from '../../shared-module/utils/constants';
import { Error } from '../../shared-module/models/Error';
import { LoginResponse } from '../../shared-module/models/LoginResponse';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared-module/shared-services/auth.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
interface ContactResponse {
  into: string,
  status: string,
  message: string
}
interface ContactRes{
  code: number,
  status: boolean,
  message: string,
  data: {
      page_head: {
          bg_cover: string,
          content: string,
      },
      contact: {
          address: string,
          email: string,
          phone_no_1: string,
          phone_no_2: string,
          map_location: {
              address: string,
              lat: string,
              lng: string,
          }
      }
  }
}


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  contactUs: ContactRes = null;
  subscription: Subscription;
  langSubscription: Subscription;
  loading = false;
  constructor(
    private contact: Contact,
    private nav: NavController,
    private route: ActivatedRoute,
    public alertService: AlertService,
    public authService: AuthService) {

  }

  ngOnInit() {
  }

  contactForm(form: NgForm) {
    if (form.valid) {
      // this.alertService.presentLoading('Please Wait...');
      const fistname = form.control.get('first-name').value;
      const lastname = form.control.get('last-name').value;
      const phone = form.control.get('phone-no').value;
      const email = form.control.get('email').value;
      const address = form.control.get('address-1').value;
      const city = form.control.get('city').value;
      const comment = form.control.get('comment').value;

      const fd = new FormData();
      fd.append('first-name', fistname);
      fd.append('last-name', lastname);
      fd.append('phone-no', phone);
      fd.append('email', email);
      fd.append('address-1', address);
      fd.append('city', city);
      fd.append('comment', comment);

      this.loading = true;
      this.contact.submitForm(fd).subscribe((response: ContactResponse) => {
        if (response.status === 'mail_sent') {
          form.reset();
          // this.alertService.dismissLoading();
          this.loading = false;
          this.alertService.presentAlert(Utils.SUCCESS, response.message, [Utils.OK]);
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
          this.nav.navigateRoot([returnUrl]);
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
      this.alertService.presentAlert(Utils.ERROR, 'Enter valid information!', [Utils.OK]);
    }
  }

  dismissLoader() { 
    this.loading = false;
  }
  getContactData() {
    this.subscription = this.contact.getContactusData().subscribe(contact => {
      if (contact.code === 200) {

        this.contactUs = contact;
        this.dismissLoader();
      } else {
        this.alertService.presentAlert(Utils.ERROR, contact.message, [Utils.OK]);
        this.dismissLoader();
      }
    } ,(error) => {
      this.dismissLoader();
      this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
    });  
  }


  ionViewDidEnter() {
    this.getContactData();
  }


  refresh(event) {
    this.loading = true;
    this.getContactData();
  }

  ionViewDidLeave(){
    if (this.langSubscription) this.langSubscription.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
   }


}
