import { TestBed } from '@angular/core/testing';

import { Epi } from './epi';

describe('Epi', () => {
  let service: Epi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Epi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
