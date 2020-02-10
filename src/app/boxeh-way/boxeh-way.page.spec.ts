import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoxehWayPage } from './boxeh-way.page';

describe('BoxehWayPage', () => {
  let component: BoxehWayPage;
  let fixture: ComponentFixture<BoxehWayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxehWayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoxehWayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
