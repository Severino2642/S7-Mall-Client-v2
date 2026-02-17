import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoutiqueComponent } from './boutique.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BoutiqueComponent', () => {
  let component: BoutiqueComponent;
  let fixture: ComponentFixture<BoutiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize boutiques on ngOnInit', () => {
    component.ngOnInit();
    expect(component.boutiques.length).toBeGreaterThan(0);
    expect(component.filteredBoutiques.length).toBe(component.boutiques.length);
  });

  it('should filter boutiques by search term', () => {
    component.searchTerm = 'Tech';
    component.applyFilters();
    expect(component.filteredBoutiques.length).toBeLessThanOrEqual(component.boutiques.length);
    expect(component.filteredBoutiques.every(b => 
      b.nom.toLowerCase().includes('tech') || 
      b.description.toLowerCase().includes('tech')
    )).toBeTruthy();
  });

  it('should filter boutiques by category', () => {
    component.selectedCategorie = 'Électronique';
    component.applyFilters();
    expect(component.filteredBoutiques.every(b => b.categorie === 'Électronique')).toBeTruthy();
  });

  it('should filter boutiques by floor', () => {
    component.selectedEtage = 'Niveau 1';
    component.applyFilters();
    expect(component.filteredBoutiques.every(b => b.etage === 'Niveau 1')).toBeTruthy();
  });

  it('should convert time to minutes correctly', () => {
    const minutes = component.timeToMinutes('14:30');
    expect(minutes).toBe(870); // 14*60 + 30
  });

  it('should check if boutique is open correctly', () => {
    const boutique = component.boutiques[0];
    const result = component.isOpen(boutique);
    expect(typeof result).toBe('boolean');
  });

  it('should reset filters', () => {
    component.searchTerm = 'test';
    component.selectedCategorie = 'Mode';
    component.selectedEtage = 'Niveau 1';
    component.heureDebutFilter = '10:00';
    component.heureFinFilter = '20:00';
    
    component.resetFilters();
    
    expect(component.searchTerm).toBe('');
    expect(component.selectedCategorie).toBe('Toutes');
    expect(component.selectedEtage).toBe('Tous les niveaux');
    expect(component.heureDebutFilter).toBe('');
    expect(component.heureFinFilter).toBe('');
  });

  it('should paginate correctly', () => {
    component.itemsPerPage = 4;
    component.filteredBoutiques = component.boutiques;
    component.calculateTotalPages();
    
    expect(component.totalPages).toBeGreaterThan(1);
    
    const firstPageItems = component.getPaginatedBoutiques();
    expect(firstPageItems.length).toBeLessThanOrEqual(4);
  });

  it('should navigate to correct page', () => {
    component.totalPages = 3;
    component.goToPage(2);
    expect(component.currentPage).toBe(2);
  });

  it('should not navigate to invalid page', () => {
    component.totalPages = 3;
    component.currentPage = 1;
    component.goToPage(5);
    expect(component.currentPage).toBe(1);
  });
});
