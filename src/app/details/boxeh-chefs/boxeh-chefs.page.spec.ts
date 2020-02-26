import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoxehChefsPage } from './boxeh-chefs.page';

describe('BoxehChefsPage', () => {
  let component: BoxehChefsPage;
  let fixture: ComponentFixture<BoxehChefsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxehChefsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoxehChefsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
