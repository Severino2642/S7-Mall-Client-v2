import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeFillesListeComponent } from './bon-commande-filles-liste.component';

describe('BonCommandeFillesListeComponent', () => {
  let component: BonCommandeFillesListeComponent;
  let fixture: ComponentFixture<BonCommandeFillesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonCommandeFillesListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonCommandeFillesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
