import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierSaisieMultipleComponent } from './fichier-saisie-multiple.component';

describe('FichierSaisieMultipleComponent', () => {
  let component: FichierSaisieMultipleComponent;
  let fixture: ComponentFixture<FichierSaisieMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichierSaisieMultipleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FichierSaisieMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
