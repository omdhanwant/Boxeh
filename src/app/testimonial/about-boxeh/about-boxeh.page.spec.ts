import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutBoxehPage } from './about-boxeh.page';

describe('AboutBoxehPage', () => {
  let component: AboutBoxehPage;
  let fixture: ComponentFixture<AboutBoxehPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutBoxehPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutBoxehPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
