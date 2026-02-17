import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseFormComponent } from './caisse-form.component';

describe('CaisseFormComponent', () => {
  let component: CaisseFormComponent;
  let fixture: ComponentFixture<CaisseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaisseFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaisseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
