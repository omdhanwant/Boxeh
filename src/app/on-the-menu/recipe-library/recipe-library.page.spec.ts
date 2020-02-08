import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecipeLibraryPage } from './recipe-library.page';

describe('RecipeLibraryPage', () => {
  let component: RecipeLibraryPage;
  let fixture: ComponentFixture<RecipeLibraryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeLibraryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeLibraryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
