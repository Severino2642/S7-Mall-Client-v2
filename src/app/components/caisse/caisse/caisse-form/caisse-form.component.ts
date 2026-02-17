import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {OffreDeLocationModel} from "../../../../models/offre_location.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BoxeModel} from "../../../../models/boxe.model";
import {OffreLocationServiceService} from "../../../../services/offre_location.service/offre-location.service.service";
import {BoxeService} from "../../../../services/boxe.service/boxe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {CaisseModel} from "../../../../models/caisse.model";
import {CaisseService} from "../../../../services/caisse.service/caisse.service";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {BoutiqueModel} from "../../../../models/boutique.model";

@Component({
  selector: 'app-caisse-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, NavbarComponent, ReactiveFormsModule],
  templateUrl: './caisse-form.component.html',
  styleUrl: './caisse-form.component.css'
})
export class CaisseFormComponent {
  @Input() item?: CaisseModel | null; // Données à modifier (null pour création)
  @Output() onSubmit = new EventEmitter<CaisseModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;
  id = null;
  loading = false;

  idProprietaire = "";

  constructor(
    private fb: FormBuilder,
    private itemService:CaisseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const boutique = StorageUtil.getFromStorage<BoutiqueModel>("boutique");
    var auth = StorageUtil.getFromStorage<any>("auth");
    if (boutique){
      this.idProprietaire = boutique._id || "";
    }else {
      this.idProprietaire = auth?.idUser || "";
    }

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
      numero_compte: [this.item?.numero_compte || '']
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
    return '';
  }

  // Soumettre le formulaire
  submitForm(): void {
    if (this.boxeForm.valid) {
      const formData: CaisseModel = {
        ...this.boxeForm.value,
        idProprietaire: this.idProprietaire
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
    var res = await this.itemService.create(formData);
    this.router.navigate([`/caisse/details/${res._id}`]);
    this.loading = false;
  }

  async updateItem(formData: BoxeModel): Promise<void> {
    this.loading = true;
    await this.itemService.update(this.id!, formData);
    this.router.navigate([`/caisse/details/${this.id}`]);
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
    return this.isEditMode ? "Modification d'une caisse" : "Créer une nouvelle caisse";
  }
}
