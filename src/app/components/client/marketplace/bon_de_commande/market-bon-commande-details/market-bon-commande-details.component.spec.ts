import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketBonCommandeDetailsComponent } from './market-bon-commande-details.component';

describe('MarketBonCommandeDetailsComponent', () => {
  let component: MarketBonCommandeDetailsComponent;
  let fixture: ComponentFixture<MarketBonCommandeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketBonCommandeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketBonCommandeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
