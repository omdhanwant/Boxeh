import { Component, OnInit } from '@angular/core';
import { Service } from './service.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.page.html',
  styleUrls: ['./our-story.page.scss'],
})
export class OurStoryPage implements OnInit {
  ourStory: OurStory = null;
  subs: Subscription
  constructor(private service: Service, private alertService: AlertService) { }

  ngOnInit() {


  }



  ionViewWillEnter() {
    this.ourStory = null;
  }

  ionViewDidEnter() {
    this.ourStory = null;
    // this.alertService.presentLoading('Please Wait...');

    this.subs = this.service.getOurStory().subscribe(ourStoryResponse => {
      if (ourStoryResponse.code === 200) {

        this.ourStory = ourStoryResponse;
        // this.alertService.dismissLoading();
      } else {
        this.alertService.presentAlert(Utils.ERROR, ourStoryResponse.message, [Utils.OK]);
      }
    });
  }

  ionViewWillLeave() {
    this.subs.unsubscribe();
  }

}
