import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreCommercialDetailsForClientComponent } from './centre-commercial-details-for-client.component';

describe('CentreCommercialDetailsForClientComponent', () => {
  let component: CentreCommercialDetailsForClientComponent;
  let fixture: ComponentFixture<CentreCommercialDetailsForClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentreCommercialDetailsForClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentreCommercialDetailsForClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
