import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallRegisterComponent } from './mall-register.component';

describe('MallRegisterComponent', () => {
  let component: MallRegisterComponent;
  let fixture: ComponentFixture<MallRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MallRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MallRegisterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
