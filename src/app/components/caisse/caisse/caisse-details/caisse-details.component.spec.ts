import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseDetailsComponent } from './caisse-details.component';

describe('CaisseDetailsComponent', () => {
  let component: CaisseDetailsComponent;
  let fixture: ComponentFixture<CaisseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaisseDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaisseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
