import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";
import {CommonModule, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {OffreDeLocationModel} from "../../../../../models/offre_location.model";
import {BoxeModel} from "../../../../../models/boxe.model";
import {
  OffreLocationServiceService
} from "../../../../../services/offre_location.service/offre-location.service.service";
import {BoxeService} from "../../../../../services/boxe.service/boxe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageUtil} from "../../../../../utils/storage.util";
import {ProduitModel} from "../../../../../models/produit.model";
import {CategorieModel} from "../../../../../models/categorie.model";
import {ProduitService} from "../../../../../services/produit.service/produit.service";
import {CategorieService} from "../../../../../services/categorie.service/categorie.service";
import {FilleModel} from "../../../../fichier_rattacher/fichier-saisie-multiple/fichier-saisie-multiple.component";

@Component({
  selector: 'app-produit-form',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './produit-form.component.html',
  styleUrl: './produit-form.component.css'
})
export class ProduitFormComponent {
  @Input() item?: ProduitModel | null;
  // @Input() itemFilles: Produit[] = [];
  @Output() onSubmit = new EventEmitter<ProduitModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;
  id = null;
  loading = false;
  listCategorie: CategorieModel[] = [];

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
      this.loadItem(this.id);
      this.isEditMode = true;
    } else {
      // Mode création
      this.isEditMode = false;
      this.initForm();
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
    if (this.boxeForm.valid) {
      const formData: BoxeModel = {
        ...this.boxeForm.value
      };

      if (this.isEditMode && this.id) {
        formData._id = this.id;
        this.updateItem(formData);
      }
      else {
        // MODE CRÉATION
        this.createItem(formData);
      }

      this.onSubmit.emit(formData);
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.boxeForm.controls).forEach(key => {
        this.boxeForm.get(key)?.markAsTouched();
      });
    }
  }

  async createItem(formData: BoxeModel): Promise<void> {
    this.loading = true;
    var res = await this.itemService.createMereFille(formData);
    this.router.navigate([`boutique/produit/details/${res._id}`]);
    this.loading = false;
  }

  async updateItem(formData: BoxeModel): Promise<void> {
    this.loading = true;
    await this.itemService.updateMereFille(this.id!, formData);
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
    return this.isEditMode ? "Modification d'une offre de location" : "Créer une nouvelle offre de location";
  }
}
