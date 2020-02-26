import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoxehPlansPage } from './boxeh-plans.page';

describe('BoxehPlansPage', () => {
  let component: BoxehPlansPage;
  let fixture: ComponentFixture<BoxehPlansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxehPlansPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoxehPlansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
