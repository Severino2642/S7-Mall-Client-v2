import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerListeComponent } from './manager-liste.component';

describe('ManagerListeComponent', () => {
  let component: ManagerListeComponent;
  let fixture: ComponentFixture<ManagerListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
