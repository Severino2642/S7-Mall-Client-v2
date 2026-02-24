import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeLocationListeComponent } from './demande-location.liste.component';

describe('DemandeLocationListeComponent', () => {
  let component: DemandeLocationListeComponent;
  let fixture: ComponentFixture<DemandeLocationListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeLocationListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandeLocationListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
