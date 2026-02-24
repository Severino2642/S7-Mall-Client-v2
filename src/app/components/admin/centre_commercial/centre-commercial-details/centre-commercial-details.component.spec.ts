import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreCommercialDetailsComponent } from './centre-commercial-details.component';

describe('CentreCommercialDetailsComponent', () => {
  let component: CentreCommercialDetailsComponent;
  let fixture: ComponentFixture<CentreCommercialDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentreCommercialDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentreCommercialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
