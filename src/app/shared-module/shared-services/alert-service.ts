import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

export const OK = 'OK';
export const SUCCESS = 'Success';
export const ERROR = 'Error';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
    constructor(private alertController: AlertController) {}


    async presentAlert(headerMessage , displayMessage , butttonsArray: any[]) {
        const alert = await this.alertController.create({
          header: headerMessage,
          subHeader: '',
          message: displayMessage,
          buttons: butttonsArray
        });

        await alert.present();
      }
}
