import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueProduitListeComponent } from './boutique-produit-liste.component';

describe('BoutiqueProduitListeComponent', () => {
  let component: BoutiqueProduitListeComponent;
  let fixture: ComponentFixture<BoutiqueProduitListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueProduitListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoutiqueProduitListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
