import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecipeBlogPage } from './recipe-blog.page';

describe('RecipeBlogPage', () => {
  let component: RecipeBlogPage;
  let fixture: ComponentFixture<RecipeBlogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeBlogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeBlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
