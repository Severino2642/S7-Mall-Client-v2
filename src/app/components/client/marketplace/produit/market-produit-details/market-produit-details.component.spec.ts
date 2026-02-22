import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketProduitDetailsComponent } from './market-produit-details.component';

describe('MarketProduitDetailsComponent', () => {
  let component: MarketProduitDetailsComponent;
  let fixture: ComponentFixture<MarketProduitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketProduitDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketProduitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
