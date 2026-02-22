import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeFillesListeComponent } from './commande-filles-liste.component';

describe('CommandeFillesListeComponent', () => {
  let component: CommandeFillesListeComponent;
  let fixture: ComponentFixture<CommandeFillesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeFillesListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeFillesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
