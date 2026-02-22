import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreCommercialFormComponent } from './centre-commercial-form.component';

describe('CentreCommercialFormComponent', () => {
  let component: CentreCommercialFormComponent;
  let fixture: ComponentFixture<CentreCommercialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentreCommercialFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentreCommercialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
