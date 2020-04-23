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

  createCCOrder() {
    const time = new Date();
    return this.http.post(`https://test.oppwa.com/v1/payments?entityId=8ac7a4c970f852940171071cb0f51482&amount=12.00&currency=JOD&testMode=EXTERNAL&paymentType=PA&paymentBrand=VISA&card.number=4111111111111111&card.holder=tester&card.expiryMonth=12&card.expiryYear=2021&card.cvv=129&shopperResultUrl=http://boxeh.net/boxeh/checkout/`,{})
      .pipe(
        map((response: any) => {
          return response;
        }));
  }
}
