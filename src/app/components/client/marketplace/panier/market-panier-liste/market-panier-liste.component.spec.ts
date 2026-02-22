import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPanierListeComponent } from './market-panier-liste.component';

describe('MarketPanierListeComponent', () => {
  let component: MarketPanierListeComponent;
  let fixture: ComponentFixture<MarketPanierListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketPanierListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketPanierListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
