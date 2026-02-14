import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichierListeOngletComponent } from './fichier-liste-onglet.component';

describe('FichierListeOngletComponent', () => {
  let component: FichierListeOngletComponent;
  let fixture: ComponentFixture<FichierListeOngletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichierListeOngletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FichierListeOngletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
