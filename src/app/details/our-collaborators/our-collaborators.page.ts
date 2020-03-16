import { Component, OnInit } from '@angular/core';
import { Service } from './service.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../shared-module/shared-services/auth.service';

@Component({
  selector: 'app-our-collaborators',
  templateUrl: './our-collaborators.page.html',
  styleUrls: ['./our-collaborators.page.scss'],
})
export class OurCollaboratorsPage implements OnInit {
  OurCollaborators: OurCollaborators = null;
  subscription: Subscription;
  langSubscription: Subscription;
  constructor(private service: Service, private authService: AuthService, private alertService: AlertService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  // ionViewWillEnter() {
  //   if (!this.service.CollaboratorsDataState) {
  //     this.alertService.presentLoading('Please wait...');
  //   }
  // }

  getBackground(image) {
      return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }
  
  initData(event?) {
    this.langSubscription =  this.authService.$currentLanguage.subscribe(languageState => {

      // if (this.authService.LANGUAGE !== languageState) {
      //   this.alertService.presentLoading('Please wait...');
      //   this.service.refreshState();
      // } 
      if (this.service.currentPageLanguage !== languageState) {
        this.service.currentPageLanguage = languageState
        this.alertService.presentLoading('Please wait...');
        this.service.refreshState();
  
      } 

      if (this.service.CollaboratorsDataState) {
        this.OurCollaborators = this.service.CollaboratorsDataState;
      } else  {
        this.subscription = this.service.getCollborators(languageState).subscribe(responseData => {
          if (responseData.code === 200) {
    
            if(event) {
              event.target.complete();
            }
            this.OurCollaborators = responseData;
            this.dismissLoader();
          } else {
            this.alertService.presentAlert(Utils.ERROR, responseData.message, [Utils.OK]);
            this.dismissLoader();
          }
        });
      }

    })
  }

  dismissLoader() {
    setTimeout(() => {
      this.alertService.dismissLoading();
    }, 100); 
  }

  ionViewDidEnter() {
    this.initData();
  }


  refresh(event) {
    this.service.refreshState(); // refresh state
    this.alertService.presentLoading('Please wait...');
    this.initData(event);
  }
  
  ionViewDidLeave(){
    if (this.langSubscription) this.langSubscription.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
   }
}
