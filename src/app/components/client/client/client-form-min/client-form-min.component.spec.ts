import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFormMinComponent } from './client-form-min.component';

describe('ClientFormMinComponent', () => {
  let component: ClientFormMinComponent;
  let fixture: ComponentFixture<ClientFormMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFormMinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientFormMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
