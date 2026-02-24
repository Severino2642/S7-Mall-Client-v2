import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeDetailsComponent } from './bon-commande-details.component';

describe('BonCommandeDetailsComponent', () => {
  let component: BonCommandeDetailsComponent;
  let fixture: ComponentFixture<BonCommandeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonCommandeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonCommandeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
