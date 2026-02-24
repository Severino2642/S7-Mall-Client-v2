import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietaireFormComponent } from './proprietaire-form.component';

describe('ProprietaireFormComponent', () => {
  let component: ProprietaireFormComponent;
  let fixture: ComponentFixture<ProprietaireFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProprietaireFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProprietaireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
