import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {

  private recipeLibraryDataState: BehaviorSubject<RecipeLibrary> = new BehaviorSubject(null);
  public currentPageLanguage: string = ''
  constructor(private http: HttpClient) { }


  get RecipeLibraryDataState() {
    return this.recipeLibraryDataState.value;
  }

  refreshState() {
    this.recipeLibraryDataState.next(null);
  }

  getRecipeLibrary(language) {
    console.log(language)
    const data = {lang: language};
    const time = new Date();
    return this.http.post(`${environment.hostUrl}/boxeh/apis/page-recipe_library.php?type=` + time.getTime(), data)
      .pipe(
        map((response: RecipeLibrary) => {
          this.recipeLibraryDataState.next(response);
          return response;
        }));
  }
}
