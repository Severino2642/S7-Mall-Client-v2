import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OffreDeLocationModel} from "../../../../../models/offre_location.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BoxeModel} from "../../../../../models/boxe.model";
import {
  OffreLocationServiceService
} from "../../../../../services/offre_location.service/offre-location.service.service";
import {BoxeService} from "../../../../../services/boxe.service/boxe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageUtil} from "../../../../../utils/storage.util";
import {BoutiqueModel} from "../../../../../models/boutique.model";
import {BoutiqueService} from "../../../../../services/boutique.service/boutique.service";
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-boutique-form',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './boutique-form.component.html',
  styleUrl: './boutique-form.component.css'
})
export class BoutiqueFormComponent {
  @Input() item?: BoutiqueModel | null; // Données à modifier (null pour création)
  @Output() onSubmit = new EventEmitter<BoutiqueModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;
  id = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private itemService:BoutiqueService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
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

  // Initialiser le formulaire
  initForm(): void {
    this.boxeForm = this.fb.group({
      nom: [this.item?.nom || '', [Validators.required]],
      description: [this.item?.description || ''],
      email: [this.item?.email || '',[Validators.email]],
      contact: [this.item?.contact || '',[Validators.required]],
      heure_ouverture: [this.item?.heure_ouverture || '',[Validators.required]],
      heure_fermeture: [this.item?.heure_fermeture || '',[Validators.required]]
    });
  }

  async loadItem(id: string): Promise<void> {
    this.loading = true;
    this.item = await this.itemService.getById(id);
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
    if (field.hasError('email')){
      return `adresse email invalide`;
    }
    return '';
  }

  // Soumettre le formulaire
  submitForm(): void {
    if (this.boxeForm.valid) {
      const formData: BoutiqueModel = {
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

  async createItem(formData: BoutiqueModel): Promise<void> {
    this.loading = true;
    var res = await this.itemService.create(formData);
    this.router.navigate([`owner/boutique/details/${res._id}`]);
    this.loading = false;
  }

  async updateItem(formData: BoutiqueModel): Promise<void> {
    this.loading = true;
    await this.itemService.update(this.id!, formData);
    this.router.navigate([`owner/boutique/details/${this.id}`]);
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
    return this.isEditMode ? "Modification d'une boutique" : "Créer une nouvelle boutique";
  }
}
