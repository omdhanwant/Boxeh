import { TestBed } from '@angular/core/testing';

import { Orders } from './orders.service';

describe('ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Orders = TestBed.get(Orders);
    expect(service).toBeTruthy();
  });
});
