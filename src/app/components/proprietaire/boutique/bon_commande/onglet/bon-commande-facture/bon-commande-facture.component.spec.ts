import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeFactureComponent } from './bon-commande-facture.component';

describe('BonCommandeFactureComponent', () => {
  let component: BonCommandeFactureComponent;
  let fixture: ComponentFixture<BonCommandeFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonCommandeFactureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonCommandeFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
