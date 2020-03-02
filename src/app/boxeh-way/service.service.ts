import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private http: HttpClient) { }


  getBoxehWhy() {
    const time = new Date();
    return this.http.get(`${environment.hostUrl}/boxeh/apis/page-the_boxeh_way.php?type=` + time.getTime())
      .pipe(
        map((response: BoxehWhy) => {
          console.log(response);
          return response;
        }));
  }
}
