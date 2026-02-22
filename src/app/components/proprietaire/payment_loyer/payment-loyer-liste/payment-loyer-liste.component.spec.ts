import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLoyerListeComponent } from './payment-loyer-liste.component';

describe('PaymentLoyerListeComponent', () => {
  let component: PaymentLoyerListeComponent;
  let fixture: ComponentFixture<PaymentLoyerListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentLoyerListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentLoyerListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
