import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  private currentUserSubject: BehaviorSubject<string> = new BehaviorSubject(this.getLoggedInUser());
  public currentUser: Observable<string> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private storage: Storage ) {
  }

  public get currentUserValue(): string {
      return this.currentUserSubject.value;
  }

  public set currentUserValue(user) {
       this.currentUserSubject.next(user);
}


registerUser(fd: FormData) {
  return this.http.post(`${environment.hostUrl}/boxeh/api/${environment.version}/register`, fd)
  .pipe(map((response: LoginResponse) => {
      return response;
  }));
}

  login(fd: FormData) {
      return this.http.post(`${environment.hostUrl}/boxeh/api/${environment.version}/login`, fd)
          .pipe(map((response: LoginResponse) => {
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
      sessionStorage.setItem('token' , '');
  }

  getLoggedInUser() {
  //  return this.storage.get('token') as Promise<string>;
    return sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
}
}
