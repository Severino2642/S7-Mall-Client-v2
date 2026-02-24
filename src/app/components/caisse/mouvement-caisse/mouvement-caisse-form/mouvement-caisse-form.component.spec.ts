import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementCaisseFormComponent } from './mouvement-caisse-form.component';

describe('MouvementCaisseFormComponent', () => {
  let component: MouvementCaisseFormComponent;
  let fixture: ComponentFixture<MouvementCaisseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouvementCaisseFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MouvementCaisseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
