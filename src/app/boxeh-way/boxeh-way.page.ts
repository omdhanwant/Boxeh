import { Component, OnInit } from '@angular/core';
import { Service } from './service.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-boxeh-way',
  templateUrl: './boxeh-way.page.html',
  styleUrls: ['./boxeh-way.page.scss'],
})
export class BoxehWayPage implements OnInit {
  boxehWhy: BoxehWhy = null;
  subs: Subscription;
  toggle1:boolean;
  toggle2:boolean;
  toggle3:boolean;
  constructor(private service: Service, private alertService: AlertService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.alertService.presentLoading('Please wait...');
  }

  getBackground(image) {
      return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }
  ionViewDidEnter() {
    this.subs = this.service.getBoxehWhy().subscribe(boxehWhyResponse => {
      if (boxehWhyResponse.code === 200) {

        this.boxehWhy = boxehWhyResponse;
        this.alertService.dismissLoading();
      } else {
        this.alertService.presentAlert(Utils.ERROR, boxehWhyResponse.message, [Utils.OK]);
        this.alertService.dismissLoading();
      }
    });
  }

  refresh(event) {
    this.alertService.presentLoading('Please wait...');
    this.subs = this.service.getBoxehWhy().subscribe(boxehWhyResponse => {
      if (boxehWhyResponse.code === 200) {
        event.target.complete();
        this.boxehWhy = boxehWhyResponse;
        this.alertService.dismissLoading();
      } else {
        this.alertService.presentAlert(Utils.ERROR, boxehWhyResponse.message, [Utils.OK]);
        this.alertService.dismissLoading();
      }
    });
  }


  ionViewWillLeave() {
    this.subs.unsubscribe();
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
