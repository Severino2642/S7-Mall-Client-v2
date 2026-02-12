import { TestBed } from '@angular/core/testing';

import { BoxeService } from './boxe.service';

describe('BoxeService', () => {
  let service: BoxeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
