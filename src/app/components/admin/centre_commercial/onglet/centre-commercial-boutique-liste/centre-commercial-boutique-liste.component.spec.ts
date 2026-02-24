import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreCommercialBoutiqueListeComponent } from './centre-commercial-boutique-liste.component';

describe('CentreCommercialBoutiqueListeComponent', () => {
  let component: CentreCommercialBoutiqueListeComponent;
  let fixture: ComponentFixture<CentreCommercialBoutiqueListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentreCommercialBoutiqueListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentreCommercialBoutiqueListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
