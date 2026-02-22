import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLoyerFormComponent } from './payment-loyer-form.component';

describe('PaymentLoyerFormComponent', () => {
  let component: PaymentLoyerFormComponent;
  let fixture: ComponentFixture<PaymentLoyerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentLoyerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentLoyerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
