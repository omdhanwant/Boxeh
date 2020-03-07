import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

interface ContactResponse {
  into: string,
  status: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class Contact {

  constructor(private http: HttpClient) { }

  submitForm(credentials) {
    return this.http.post(`http://boxeh.net/boxeh/wp-json/contact-form-7/v1/contact-forms/229/feedback`, credentials)
      .pipe(map((response: ContactResponse) => {
        return response;
      }));
  }

}
