import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<any>(null);
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
      return this.currentUserSubject.value;
  }

  login(fd: FormData) {
      return this.http.post<any>(`${environment.hostUrl}/boxeh/api/${environment.version}/login`, fd)
          .pipe(map((response: LoginResponse) => {
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
}
