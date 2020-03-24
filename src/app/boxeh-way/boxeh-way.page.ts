import { Component, OnInit } from '@angular/core';
import { Service } from './service.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../shared-module/shared-services/auth.service';

@Component({
  selector: 'app-boxeh-way',
  templateUrl: './boxeh-way.page.html',
  styleUrls: ['./boxeh-way.page.scss'],
})
export class BoxehWayPage implements OnInit {
  boxehWhy: BoxehWhy = null;
  subscription: Subscription;
  langSubscription: Subscription;
  toggle1:boolean;
  toggle2:boolean;
  toggle3:boolean;
  loading = false;
  constructor(private service: Service, private alertService: AlertService, public authService: AuthService) { }

  ngOnInit() {
  }

  initData(event?) {
      this.langSubscription =  this.authService.$currentLanguage.subscribe(languageState => {

        if (this.service.currentPageLanguage !== languageState) {
          this.service.currentPageLanguage = languageState
          this.loading = true;
          this.service.refreshState();
    
        } 
        
      if (this.service.BoxehWayDataState) {

        this.boxehWhy = this.service.BoxehWayDataState;

      } else  {
        this.subscription = this.service.getBoxehWhy(languageState).subscribe(boxehWay => {
          if (boxehWay.code === 200) {
    
            if(event) {
              event.target.complete();
            }
            this.boxehWhy = boxehWay;
            this.dismissLoader();
          } else {
            this.alertService.presentAlert(Utils.ERROR, boxehWay.message, [Utils.OK]);
            this.dismissLoader();
          }
        });
      }
    })
  }

  dismissLoader() {
    // setTimeout(() => {
    //   this.alertService.dismissLoading();
    // }, 100); 
    this.loading = false;
  }

  ionViewDidEnter() {
    this.initData();
  }


  refresh(event) {
    this.service.refreshState(); // refresh state
    this.loading = true;
    this.initData(event);
  }

  ionViewDidLeave(){
   if (this.langSubscription) this.langSubscription.unsubscribe();
   if (this.subscription) this.subscription.unsubscribe();
  }

  toggleSection1(){
    this.toggle1 = !this.toggle1
  }
  toggleSection2(){
    this.toggle2 = !this.toggle2
  }
  toggleSection3(){
    this.toggle3 = !this.toggle3
  }

}
