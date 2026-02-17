import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseListeComponent } from './caisse-liste.component';

describe('CaisseListeComponent', () => {
  let component: CaisseListeComponent;
  let fixture: ComponentFixture<CaisseListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaisseListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaisseListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
