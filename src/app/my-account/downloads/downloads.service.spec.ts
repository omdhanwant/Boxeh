import { TestBed } from '@angular/core/testing';

import { Downloads } from './downloads.service';

describe('ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Downloads = TestBed.get(Downloads);
    expect(service).toBeTruthy();
  });
});
