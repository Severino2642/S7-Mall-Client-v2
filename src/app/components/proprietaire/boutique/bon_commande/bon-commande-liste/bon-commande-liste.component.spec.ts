import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCommandeListeComponent } from './bon-commande-liste.component';

describe('BonCommandeListeComponent', () => {
  let component: BonCommandeListeComponent;
  let fixture: ComponentFixture<BonCommandeListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonCommandeListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonCommandeListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
