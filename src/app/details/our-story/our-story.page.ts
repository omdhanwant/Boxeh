import { Component, OnInit } from '@angular/core';
import { Service } from './service.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { Utils } from 'src/app/shared-module/utils/constants';

@Component({
  selector: 'app-our-story',
  templateUrl: './our-story.page.html',
  styleUrls: ['./our-story.page.scss'],
})
export class OurStoryPage implements OnInit {
  ourStory: OurStory = null;
  constructor(private service: Service, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getOurStory().subscribe(ourStoryResponse => {
      if (ourStoryResponse.code === 200 ) {
        this.ourStory = ourStoryResponse;
      } else {
        this.alertService.presentAlert(Utils.ERROR , ourStoryResponse.message , [Utils.OK]);
      }
    });

  }

}
