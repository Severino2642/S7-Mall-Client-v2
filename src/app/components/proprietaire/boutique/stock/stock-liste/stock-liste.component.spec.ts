import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListeComponent } from './stock-liste.component';

describe('StockListeComponent', () => {
  let component: StockListeComponent;
  let fixture: ComponentFixture<StockListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
