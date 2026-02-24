import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLoyerEncaissementListeComponent } from './payment-loyer-encaissement-liste.component';

describe('PaymentLoyerEncaissementListeComponent', () => {
  let component: PaymentLoyerEncaissementListeComponent;
  let fixture: ComponentFixture<PaymentLoyerEncaissementListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentLoyerEncaissementListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentLoyerEncaissementListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
