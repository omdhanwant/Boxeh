import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

export const OK = 'OK';
export const SUCCESS = 'Success';
export const ERROR = 'Error';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
    constructor(private alertController: AlertController, private loadingController: LoadingController) {}


    // Alert
    async presentAlert(headerMessage , displayMessage , butttonsArray: any[]) {
        const alert = await this.alertController.create({
          header: headerMessage,
          subHeader: '',
          message: displayMessage,
          buttons: butttonsArray
        });

        await alert.present();
      }


      // Loader
      async presentLoading(loadingMessage) {
        const loading = await this.loadingController.create({
          spinner: 'circles',
        //   duration: 5000,
          message: loadingMessage,
          translucent: false,
        //   cssClass: 'custom-class custom-loading'
        });
        return await loading.present();
      }


      async dismissLoading() {
        return await this.loadingController.dismiss();
      }
}
