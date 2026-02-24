import { TestBed } from '@angular/core/testing';

import { BonDeCommandeService } from './bon-de-commande.service';

describe('BonDeCommandeService', () => {
  let service: BonDeCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonDeCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
