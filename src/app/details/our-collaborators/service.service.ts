import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private http: HttpClient) { }

  getCollborators() {
    const time = new Date();
    return this.http.get(`${environment.hostUrl}/boxeh/apis/page-our_collabrator.php?type=` + time.getTime())
      .pipe(
        map((response: OurCollaborators) => {
          console.log(response);
          return response;
        }));
  }
}
