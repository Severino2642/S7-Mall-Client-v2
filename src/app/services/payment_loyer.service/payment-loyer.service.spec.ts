import { TestBed } from '@angular/core/testing';

import { PaymentLoyerService } from './payment-loyer.service';

describe('PaymentLoyerService', () => {
  let service: PaymentLoyerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentLoyerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
