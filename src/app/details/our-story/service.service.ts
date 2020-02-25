import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private http: HttpClient) { }


  getOurStory() {
    return this.http.get(`${environment.hostUrl}/boxeh/apis/page-our_story.php`)
      .pipe(
        map((response: OurStory) => {
          console.log(response);
          return response;
        }));
  }
}
