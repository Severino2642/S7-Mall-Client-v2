import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteListeComponent } from './vente-liste.component';

describe('VenteListeComponent', () => {
  let component: VenteListeComponent;
  let fixture: ComponentFixture<VenteListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VenteListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
