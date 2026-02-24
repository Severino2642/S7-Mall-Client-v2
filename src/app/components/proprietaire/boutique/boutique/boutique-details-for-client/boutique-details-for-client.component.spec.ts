import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueDetailsForClientComponent } from './boutique-details-for-client.component';

describe('BoutiqueDetailsForClientComponent', () => {
  let component: BoutiqueDetailsForClientComponent;
  let fixture: ComponentFixture<BoutiqueDetailsForClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueDetailsForClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoutiqueDetailsForClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
