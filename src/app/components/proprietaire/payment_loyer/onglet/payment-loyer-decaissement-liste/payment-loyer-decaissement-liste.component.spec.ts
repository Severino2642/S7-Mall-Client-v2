import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLoyerDecaissementListeComponent } from './payment-loyer-decaissement-liste.component';

describe('PaymentLoyerDecaissementListeComponent', () => {
  let component: PaymentLoyerDecaissementListeComponent;
  let fixture: ComponentFixture<PaymentLoyerDecaissementListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentLoyerDecaissementListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentLoyerDecaissementListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
