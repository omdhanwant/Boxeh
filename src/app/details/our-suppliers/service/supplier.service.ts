import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared-module/models/User';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private supplierDataState: BehaviorSubject<Supplier> = new BehaviorSubject(null);
  public currentPageLanguage: string = ''
  constructor(private http: HttpClient) { }


  get SupplierDataState() {
    return this.supplierDataState.value;
  }

  refreshState() {
    this.supplierDataState.next(null);
  }


  getSupplier(language) {
    const data = {lang: language};
    const time = new Date();
    return this.http.post(`${environment.hostUrl}/boxeh/apis/page-our_supplier.php?type=` + time.getTime(), data)
      .pipe(
        map((response: Supplier) => {
          this.supplierDataState.next(response);
          return response;
        }));
  }
}
