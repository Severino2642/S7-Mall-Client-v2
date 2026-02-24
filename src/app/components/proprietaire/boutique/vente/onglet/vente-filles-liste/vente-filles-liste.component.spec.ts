import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteFillesListeComponent } from './vente-filles-liste.component';

describe('VenteFillesListeComponent', () => {
  let component: VenteFillesListeComponent;
  let fixture: ComponentFixture<VenteFillesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenteFillesListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VenteFillesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
