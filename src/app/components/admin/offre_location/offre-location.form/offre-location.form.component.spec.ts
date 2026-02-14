import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreLocationFormComponent } from './offre-location.form.component';

describe('OffreLocationFormComponent', () => {
  let component: OffreLocationFormComponent;
  let fixture: ComponentFixture<OffreLocationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreLocationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffreLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
