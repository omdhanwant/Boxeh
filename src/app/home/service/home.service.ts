import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getHomeData() {
    const time = new Date();
    return this.http.get(`${environment.hostUrl}/boxeh/apis/page-home.php?type=` + time.getTime())
      .pipe(
        map((response: Home) => {
          return response;
        }));
  }
}
