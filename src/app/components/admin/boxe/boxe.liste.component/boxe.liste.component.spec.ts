import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxeListeComponent } from './boxe.liste.component';

describe('BoxeListeComponent', () => {
  let component: BoxeListeComponent;
  let fixture: ComponentFixture<BoxeListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxeListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxeListeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
