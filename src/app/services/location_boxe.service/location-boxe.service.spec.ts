import { TestBed } from '@angular/core/testing';

import { LocationBoxeService } from './location-boxe.service';

describe('LocationBoxeService', () => {
  let service: LocationBoxeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationBoxeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
