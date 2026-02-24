import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietaireDetailsComponent } from './proprietaire-details.component';

describe('ProprietaireDetailsComponent', () => {
  let component: ProprietaireDetailsComponent;
  let fixture: ComponentFixture<ProprietaireDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProprietaireDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProprietaireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
