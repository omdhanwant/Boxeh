import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

interface LoginResponse {
  success: {
    token: string
  };
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<string> = null;

  constructor(private http: HttpClient, private storage: Storage ) {
    this.currentUserSubject  = new BehaviorSubject<any>(this.getLoggedInUser());
    this.currentUser = this.currentUserSubject.asObservable();
      // this.getLoggedInUser().then(user => {
      //   if (user) {
      //     this.currentUserSubject  = new BehaviorSubject<any>(user);
      //   } else {
      //     this.currentUserSubject  = new BehaviorSubject<any>(null);
      //   }
      //   this.currentUser = this.currentUserSubject.asObservable();
      // });

  }

  public get currentUserValue(): string {
      return this.currentUserSubject.value;
  }

  login(fd: FormData) {
      return this.http.post(`${environment.hostUrl}/boxeh/api/${environment.version}/login`, fd)
          .pipe(map((response: LoginResponse) => {
              // this.storage.set('token', response.success.token);
              sessionStorage.setItem('token', response.success.token);
              this.currentUserSubject.next(response.success.token);
              return response;
          }));
  }

  isAuthenticated(): boolean {
    return this.currentUserValue ? true : false;
  }

  logout() {
      this.currentUserSubject.next(null);
  }

  getLoggedInUser() {
  //  return this.storage.get('token') as Promise<string>;
    return sessionStorage.getItem('token');
}
}
