import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeListeComponent } from './commande-liste.component';

describe('CommandeListeComponent', () => {
  let component: CommandeListeComponent;
  let fixture: ComponentFixture<CommandeListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandeListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
