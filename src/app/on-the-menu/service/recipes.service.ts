import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { RecipeBlog } from '../modal/recipe.blog';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
    constructor(private http: HttpClient) { }
  
    getReceipe(language, id) {
      const time = new Date();
      let fd = new FormData();
      fd.append('lang', language);
      fd.append('id',id);
      return this.http.post(`${environment.hostUrl}/boxeh/apis/get_single_recipe.php?&type=${time.getTime()}`, fd)
        .pipe(
          map((response: RecipeBlog) => {
            return response;
          }));
    }
  
}