import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOngletListeComponent } from './manager-onglet-liste.component';

describe('ManagerOngletListeComponent', () => {
  let component: ManagerOngletListeComponent;
  let fixture: ComponentFixture<ManagerOngletListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerOngletListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerOngletListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
