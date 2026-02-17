import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitListeComponent } from './produit-liste.component';

describe('ProduitListeComponent', () => {
  let component: ProduitListeComponent;
  let fixture: ComponentFixture<ProduitListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
