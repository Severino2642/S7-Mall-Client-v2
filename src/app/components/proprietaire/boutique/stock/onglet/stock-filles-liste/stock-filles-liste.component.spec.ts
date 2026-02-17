import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockFillesListeComponent } from './stock-filles-liste.component';

describe('StockFillesListeComponent', () => {
  let component: StockFillesListeComponent;
  let fixture: ComponentFixture<StockFillesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockFillesListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockFillesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
