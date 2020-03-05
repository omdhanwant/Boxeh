import { TestBed } from '@angular/core/testing';

import { BoxehPlansServiceService } from './boxeh-plans-service.service';

describe('BoxehPlansServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoxehPlansServiceService = TestBed.get(BoxehPlansServiceService);
    expect(service).toBeTruthy();
  });
});
