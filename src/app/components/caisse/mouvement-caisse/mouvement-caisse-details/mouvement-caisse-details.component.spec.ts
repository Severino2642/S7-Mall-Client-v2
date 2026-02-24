import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementCaisseDetailsComponent } from './mouvement-caisse-details.component';

describe('MouvementCaisseDetailsComponent', () => {
  let component: MouvementCaisseDetailsComponent;
  let fixture: ComponentFixture<MouvementCaisseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouvementCaisseDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MouvementCaisseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
