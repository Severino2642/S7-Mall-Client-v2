import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreCommercialOffreListeComponent } from './centre-commercial-offre-liste.component';

describe('CentreCommercialOffreListeComponent', () => {
  let component: CentreCommercialOffreListeComponent;
  let fixture: ComponentFixture<CentreCommercialOffreListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentreCommercialOffreListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentreCommercialOffreListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
