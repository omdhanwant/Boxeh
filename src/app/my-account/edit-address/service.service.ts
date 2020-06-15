import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { userResponse } from 'src/app/checkout/model/userResponse';


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

  getUserData(data){
    const time = new Date();
    return this.http.post(`${environment.hostUrl}/boxeh/apis/get_user_data.php?type=` + time.getTime(), data)
    .pipe(
      map((response: userResponse) => {
        return response;
      }));
  }

}
