import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueListeComponent } from './boutique.liste.component';

describe('BoutiqueListeComponent', () => {
  let component: BoutiqueListeComponent;
  let fixture: ComponentFixture<BoutiqueListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoutiqueListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
