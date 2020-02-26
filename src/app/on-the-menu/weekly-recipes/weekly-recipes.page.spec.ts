import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeeklyRecipesPage } from './weekly-recipes.page';

describe('WeeklyRecipesPage', () => {
  let component: WeeklyRecipesPage;
  let fixture: ComponentFixture<WeeklyRecipesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyRecipesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeeklyRecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
