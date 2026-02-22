import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLoyerDetailsComponent } from './payment-loyer-details.component';

describe('PaymentLoyerDetailsComponent', () => {
  let component: PaymentLoyerDetailsComponent;
  let fixture: ComponentFixture<PaymentLoyerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentLoyerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentLoyerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
