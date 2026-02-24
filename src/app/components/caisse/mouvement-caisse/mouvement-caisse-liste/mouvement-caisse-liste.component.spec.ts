import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementCaisseListeComponent } from './mouvement-caisse-liste.component';

describe('MouvementCaisseListeComponent', () => {
  let component: MouvementCaisseListeComponent;
  let fixture: ComponentFixture<MouvementCaisseListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouvementCaisseListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MouvementCaisseListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
