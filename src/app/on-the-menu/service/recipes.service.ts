import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { RecipeBlog } from '../modal/recipe.blog';
import { RecipeCategory } from '../modal/recipe.category';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private weeklyReceipeDataState: BehaviorSubject<Weekly> = new BehaviorSubject(null);
  public currentPageLanguage: string = ''
    constructor(private http: HttpClient) { }

    get WeeklyReceipeDataState() {
      return this.weeklyReceipeDataState.value;
    }

    refreshState() {
      this.weeklyReceipeDataState.next(null);
    }

    getWeeklyReceipe(language) {
      const data = {lang: language};
      const time = new Date();
      return this.http.post(`${environment.hostUrl}/boxeh/apis/page-weekly_recipes.php?type=` + time.getTime(), data)
        .pipe(
          map((response: Weekly) => {
            this.weeklyReceipeDataState.next(response);
            return response;
          }));
    }
  
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
    getReceipeCategory(language, id) {
      const time = new Date();
      let fd = new FormData();
      // fd.append('lang', language);
      fd.append('id',id);
      return this.http.post(`${environment.hostUrl}/boxeh/apis/get_recipes_by_category.php?&type=${time.getTime()}`, fd)
        .pipe(
          map((response: RecipeCategory) => {
            return response;
          }));
    }
  
}