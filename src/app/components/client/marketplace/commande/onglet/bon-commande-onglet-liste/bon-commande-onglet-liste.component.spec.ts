import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeOngletListeComponent } from './bon-commande-onglet-liste.component';

describe('BonCommandeOngletListeComponent', () => {
  let component: BonCommandeOngletListeComponent;
  let fixture: ComponentFixture<BonCommandeOngletListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonCommandeOngletListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonCommandeOngletListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
