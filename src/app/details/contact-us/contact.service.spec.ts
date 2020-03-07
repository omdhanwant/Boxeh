import { TestBed } from '@angular/core/testing';

import { Contact } from './contact.service';

describe('ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Contact = TestBed.get(Contact);
    expect(service).toBeTruthy();
  });
});
