import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";
import {CommonModule, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BoxeModel} from "../../../../../models/boxe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProduitModel} from "../../../../../models/produit.model";
import {CategorieModel} from "../../../../../models/categorie.model";
import {ProduitService} from "../../../../../services/produit.service/produit.service";
import {CategorieService} from "../../../../../services/categorie.service/categorie.service";
import {ProduitVarianteModel} from "../../../../../models/produit-variante.model";
import {FileModel} from "../../../../../models/file.model";
import {StorageUtil} from "../../../../../utils/storage.util";

export interface FilleModel extends ProduitVarianteModel {
  selected?: boolean;
}

@Component({
  selector: 'app-produit-form',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './produit-form.component.html',
  styleUrl: './produit-form.component.css'
})
export class ProduitFormComponent {
  // Mere
  @Input() item?: ProduitModel | null;
  // @Input() itemFilles: Produit[] = [];
  @Output() onSubmit = new EventEmitter<ProduitModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;
  id = null;
  loading = false;
  listCategorie: CategorieModel[] = [];

  // Filles
  @Input() initialFilles: ProduitVarianteModel[] = [];
  filles: FilleModel[] = [];
  selectAll = false;

  constructor(
    private fb: FormBuilder,
    private itemService:ProduitService,
    private categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    await this.loadListeCategorie();
    if (this.id!=null && this.id!="") {
      // Mode modification
      await this.loadItem(this.id);
      this.isEditMode = true;
    } else {
      // Mode création
      this.isEditMode = false;
      this.initForm();
    }
    if (this.initialFilles && this.initialFilles.length > 0) {
      this.filles = this.initialFilles.map(f => ({ ...f, selected: true }));
    } else {
      this.addRow();
    }
  }


  async loadListeCategorie(): Promise<void> {
    this.loading = true;
    var res = await this.categorieService.getAll();
    if (res!=null){
      this.listCategorie = res;
    }
    this.loading = false;
  }

  // Initialiser le formulaire
  initForm(): void {
    this.boxeForm = this.fb.group({
      nom: [this.item?.nom || '', [Validators.required]],
      idCategorie: [this.item?.idCategorie || '', [Validators.required]],
      description: [this.item?.description || ''],
      prix: [this.item?.prix || '',[Validators.min(1),Validators.required]],
    });
  }

  async loadItem(id: string): Promise<void> {
    this.loading = true;
    // this.item = await this.itemService.getById(id);
    const res = await this.itemService.getCPLById(id);
    this.item = res;
    if (res?.variantes){
      this.initialFilles = res?.variantes;
    }
    this.initForm(); // Le formulaire se remplit automatiquement
    this.loading = false;
  }

  // Vérifier si un champ est invalide et a été touché
  isFieldInvalid(fieldName: string): boolean {
    const field = this.boxeForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Obtenir le message d'erreur pour un champ
  getFieldError(fieldName: string): string {
    const field = this.boxeForm.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (field.hasError('minlength')) {
      const minLength = field.getError('minlength').requiredLength;
      return `Minimum ${minLength} caractères requis`;
    }
    if (field.hasError('min')){
      const min = field.getError('min');
      return `La valeur minimum doit etre ${min}`;
    }
    return '';
  }

  // Soumettre le formulaire
  submitForm(): void {
    if (this.boxeForm.valid && this.validateFormFille()) {
      const boutique = StorageUtil.getFromStorage<any>("boutique");
      const formData: ProduitModel = {
        ...this.boxeForm.value,
        idBoutique:boutique._id
      };
      const cleanedFilles = this.filles
        .filter(fille => fille.selected)
        .map(({ selected, ...cleanFile }) => ({ ...cleanFile }));
      if (this.isEditMode && this.id) {
        formData._id = this.id;
        this.updateItem(formData, cleanedFilles);
      }
      else {
        // MODE CRÉATION
        this.createItem(formData, cleanedFilles);
      }

      this.onSubmit.emit(formData);
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.boxeForm.controls).forEach(key => {
        this.boxeForm.get(key)?.markAsTouched();
      });
    }
  }

  async createItem(formData: any,filles:any): Promise<void> {
    this.loading = true;
    const bigData = {
      mere: formData,
      filles: filles
    }
    var res = await this.itemService.createMereFille(bigData);
    this.router.navigate([`boutique/produit/details/${res._id}`]);
    this.loading = false;
  }

  async updateItem(formData: any,filles:any): Promise<void> {
    this.loading = true;
    const bigData = {
      mere: formData,
      filles: filles
    }
    await this.itemService.updateMereFille(this.id!, bigData);
    this.router.navigate([`boutique/produit/details/${this.id}`]);
    this.loading = false;
  }

  // Annuler
  cancel(): void {
    this.onCancel.emit();
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.boxeForm.reset({
      idBoxe: '',
      description: '',
      montantLoyer: 0,
    });
  }

  getTitre(): string {
    return this.isEditMode ? "Modification d'une produit" : "Créer une nouvelle produit";
  }


  addRow(): void {
    const newFile: FilleModel = {
      _id: undefined,
      val: '',
      desce: '',
      selected: false
    };
    this.filles.push(newFile);
  }

  // Supprimer une ligne spécifique
  deleteRow(index: number): void {
    this.filles.splice(index, 1);
    this.updateSelectAll();

    // Ajouter une ligne vide si le tableau est vide
    if (this.filles.length === 0) {
      this.addRow();
    }
  }

  // Supprimer les lignes sélectionnées
  deleteSelected(): void {
    const selectedCount = this.getSelectedCount();

    if (selectedCount === 0) {
      alert('Aucune ligne sélectionnée');
      return;
    }

    if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedCount} ligne(s) ?`)) {
      this.filles = this.filles.filter(fille => !fille.selected);
      this.selectAll = false;

      // Ajouter une ligne vide si le tableau est vide
      if (this.filles.length === 0) {
        this.addRow();
      }
    }
  }

  // Toggle sélection globale
  toggleSelectAll(): void {
    this.filles.forEach(fille => fille.selected = this.selectAll);
  }

  // Mettre à jour la sélection globale
  updateSelectAll(): void {
    this.selectAll = this.filles.length > 0 &&
      this.filles.every(fille => fille.selected);
  }

  private generateTempId(): string {
    return 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Compter les lignes sélectionnées
  getSelectedCount(): number {
    return this.filles.filter(fille => fille.selected).length;
  }

  hasSelection(): boolean {
    return this.getSelectedCount() > 0;
  }

  validateFormFille(): boolean {
    // Vérifier que toutes les lignes ont au moins un nom et une URL
    for (let i = 0; i < this.filles.length; i++) {
      const file = this.filles[i];

      if (!file.val || file.val.trim() === '') {
        alert(`Veuillez remplir le nom de la variante à la ligne ${i + 1}`);
        return false;
      }

      if (!file.desce || file.desce.trim() === '') {
        alert(`Veuillez remplir la description de la variante à la ligne ${i + 1}`);
        return false;
      }
    }

    return true;
  }

  trackByFn(index: number, item: FilleModel): any {
    return item._id || index;
  }
}
