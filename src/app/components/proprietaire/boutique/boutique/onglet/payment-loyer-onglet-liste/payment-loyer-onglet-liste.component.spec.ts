import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLoyerOngletListeComponent } from './payment-loyer-onglet-liste.component';

describe('PaymentLoyerOngletListeComponent', () => {
  let component: PaymentLoyerOngletListeComponent;
  let fixture: ComponentFixture<PaymentLoyerOngletListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentLoyerOngletListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentLoyerOngletListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
