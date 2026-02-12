import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxeSaisieComponent } from './boxe.saisie.component';

describe('BoxeSaisieComponent', () => {
  let component: BoxeSaisieComponent;
  let fixture: ComponentFixture<BoxeSaisieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxeSaisieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxeSaisieComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
