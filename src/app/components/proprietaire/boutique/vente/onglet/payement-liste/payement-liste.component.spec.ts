import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementListeComponent } from './payement-liste.component';

describe('PayementListeComponent', () => {
  let component: PayementListeComponent;
  let fixture: ComponentFixture<PayementListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayementListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayementListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
