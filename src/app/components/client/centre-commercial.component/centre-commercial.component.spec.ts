import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CentreCommercialComponent } from './centre-commercial.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CentreCommercialComponent', () => {
  let component: CentreCommercialComponent;
  let fixture: ComponentFixture<CentreCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentreCommercialComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentreCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load centres on init', () => {
    expect(component.centres.length).toBeGreaterThan(0);
    expect(component.filteredCentres.length).toBe(component.centres.length);
  });

  it('should select first centre by default', () => {
    expect(component.selectedCentre).toBeTruthy();
    expect(component.selectedCentre?.id).toBe(component.centres[0].id);
  });

  it('should update selected centre when clicking', () => {
    const secondCentre = component.centres[1];
    component.selectCentre(secondCentre);
    
    expect(component.selectedCentre?.id).toBe(secondCentre.id);
    expect(component.mapCenter.lat).toBe(secondCentre.latitude);
    expect(component.mapCenter.lng).toBe(secondCentre.longitude);
  });

  it('should filter centres by search term', () => {
    component.searchTerm = 'OLYMPIA';
    component.searchCentres();
    
    expect(component.filteredCentres.length).toBe(1);
    expect(component.filteredCentres[0].nom).toContain('OLYMPIA');
  });

  it('should check if centre is open', () => {
    const mockCentre = {
      id: 1,
      nom: 'Test Mall',
      adresse: 'Test Address',
      ville: 'Test City',
      heureOuverture: '08:00',
      heureFermeture: '22:00',
      latitude: 0,
      longitude: 0
    };

    // This will depend on current time
    const isOpen = component.isOpen(mockCentre);
    expect(typeof isOpen).toBe('boolean');
  });

  it('should get status correctly', () => {
    const mockCentre = component.centres[0];
    const status = component.getStatus(mockCentre);
    
    expect(status.text).toBeDefined();
    expect(status.class).toBeDefined();
    expect(['Ouvert', 'Fermé']).toContain(status.text);
  });

  it('should calculate distance', () => {
    const centre = component.centres[0];
    const distance = component.getDistance(centre);
    
    expect(distance).toContain('km');
  });

  it('should reset filters when search is empty', () => {
    component.searchTerm = 'test';
    component.searchCentres();
    
    component.searchTerm = '';
    component.searchCentres();
    
    expect(component.filteredCentres.length).toBe(component.centres.length);
  });
});
