import { TestBed } from '@angular/core/testing';

import { OffreLocationServiceService } from './offre-location.service.service';

describe('OffreLocationServiceService', () => {
  let service: OffreLocationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffreLocationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
