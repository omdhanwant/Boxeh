import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { orderResponse } from './model/orderResponse';

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

  createOrder(data) {
    const time = new Date();
    return this.http.post(`${environment.hostUrl}/boxeh/apis/create_order.php?type=` + time.getTime(), data)
      .pipe(
        map((response: orderResponse) => {
          return response;
        }));
  }
}
