import { Component, OnInit } from '@angular/core';
import { Service } from './service.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared-module/shared-services/auth.service';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.page.html',
  styleUrls: ['./our-story.page.scss'],
})
export class OurStoryPage implements OnInit {
  ourStory: OurStory = null;
  subscription: Subscription;
  langSubscription: Subscription;
  segment;
  recipeSegment;
  loading = false;

  constructor(private service: Service, private alertService: AlertService, public authService: AuthService,  private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
}
  initData(event?) {

    this.langSubscription =  this.authService.$currentLanguage.subscribe(languageState => {

      if (this.service.currentPageLanguage !== languageState) {
        this.service.currentPageLanguage = languageState
        this.loading = true;
        this.service.refreshState();
  
      } 
      
      
      if (this.service.OursStoryDataState) {
        
        this.ourStory = this.service.OursStoryDataState;
  
      } else  {

        this.subscription = this.service.getOurStory(languageState).subscribe(home => {
          if (home.code === 200) {
    
            if(event) {
              event.target.complete();
            }
            this.ourStory = home;
            this.dismissLoader();
          } else {
            this.alertService.presentAlert(Utils.ERROR, home.message, [Utils.OK]);
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
}