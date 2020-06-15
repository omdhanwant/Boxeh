import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
interface OrdersResponse{
  code: number,
  status: boolean,
  message: string,
  data:
      {
          order_id:number,
          status:  string,
          currency: string,
          total: number,
          date_created: {
              date:  string,
              timezone_type:  string,
              timezone:  string,
          },
          payment_method:  string,
      }[]
}

@Injectable({
  providedIn: 'root'
})
export class Orders {

  constructor(private http: HttpClient) { }

  getOrdersData(credentials) {
    const time = new Date();
    return this.http.post(`${environment.hostUrl}/boxeh/apis/get_orders.php?type=` + time.getTime(), credentials)
      .pipe(map((response: OrdersResponse) => {
        return response;
      }));
  }

  // getOrdersData(){
  //   const time = new Date();
  //   return this.http.get(`${environment.hostUrl}/boxeh/apis/get_orders.php?type=` + time.getTime())
  //     .pipe(
  //       map((response: ContactRes) => {
  //         return response;
  //       }));
  // }

}
