import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { orderResponse, paymentMethods } from './model/orderResponse';

// interface createOrderResponse {
//   into: string,
//   status: any,
//   message: string
// }

@Injectable({
  providedIn: 'root'
})
export class Service {
  constructor(private http: HttpClient) { }

  getPaymentMethods(){
    const time = new Date();
    return this.http.get(`${environment.hostUrl}/boxeh/apis/get_payment_gateways.php`)
      .pipe(
        map((response: paymentMethods) => {
          return response;
        }));
  }
  createOrder(data) {
    const time = new Date();
    return this.http.post(`${environment.hostUrl}/boxeh/apis/create_order.php?type=` + time.getTime(), data)
      .pipe(
        map((response: orderResponse) => {
          return response;
        }));
  }

  createCCOrder(entityId,amount,currency,testMode,paymentType,paymentBrand,cardNo,cardHolder,expiryMonth,expiryYear,cvv) {
    const time = new Date();
    return this.http.post(`https://test.oppwa.com/v1/payments?entityId=${entityId}&amount=${amount}&currency=${currency}&testMode=${testMode}&paymentType=${paymentType}&paymentBrand=${paymentBrand}&card.number=${cardNo}&card.holder=${cardHolder}&card.expiryMonth=${expiryMonth}&card.expiryYear=${expiryYear}&card.cvv=${cvv}&shopperResultUrl=http://boxeh.net/boxeh/checkout/`,{})
      .pipe(
        map((response: any) => {
          return response;
        }));
  }
}
