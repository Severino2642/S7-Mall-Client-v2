import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ManagerCPLModel} from "../../../../models/manager.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BoutiqueCPLModel} from "../../../../models/boutique.model";
import {ManagerService} from "../../../../services/manager.service/manager.service";
import {BoutiqueService} from "../../../../services/boutique.service/boutique.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {MouvementCaisseModel} from "../../../../models/mouvement-caisse.model";
import {BoxeModel} from "../../../../models/boxe.model";
import {CentreCommercialModel} from "../../../../models/mall.model";
import {MallService} from "../../../../services/mall.service/mall.service";
import {HeaderComponent} from "../../header.component/header.component";
import {NavbarComponent} from "../../navbar.component/navbar.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-centre-commercial-form',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    NavbarComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './centre-commercial-form.component.html',
  styleUrl: './centre-commercial-form.component.css'
})
export class CentreCommercialFormComponent {
  @Input() item?: CentreCommercialModel | null; // Données à modifier (null pour création)
  @Output() onSubmit = new EventEmitter<CentreCommercialModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;
  id = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private itemService:MallService,
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
    const auth = StorageUtil.getFromStorage<any>("auth");
    this.boxeForm = this.fb.group({
      nom: [this.item?.nom || ''],
      adresse: [this.item?.adresse || ''],
      heure_ouverture: [this.item?.heure_ouverture || '', [Validators.required]],
      heure_fermeture: [this.item?.heure_fermeture || '', [Validators.required]],
      identifiant: [auth.identifiant || '', [Validators.email]],
      mdp: ['', this.isEditMode ? [Validators.minLength(6)] : [Validators.required, Validators.minLength(6)]]
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
      return `La valeur doit être au moins ${min.min}`;
    }
    if (field.hasError('max')){
      const max = field.getError('max');
      return `La valeur doit être au plus ${max.max}`;
    }
    return '';
  }

  // Soumettre le formulaire
  submitForm(): void {
    if (this.boxeForm.valid) {
      const formData: MouvementCaisseModel = {
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
    var res = await this.itemService.createCentre(formData);
    this.router.navigate([`admin/centre_commercial/details/${res._id}`]);
    this.loading = false;
  }

  async updateItem(formData: BoxeModel): Promise<void> {
    this.loading = true;
    await this.itemService.update(this.id!, formData);
    this.router.navigate([`admin/centre_commercial/details/${this.id}`]);
    this.loading = false;
  }

  // Annuler
  cancel(): void {
    this.onCancel.emit();
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.boxeForm.reset({
      idCaisse: '',
      designation: '',
      debit: '',
      credit: '',
      date: '',
    });
  }

  getTitre(): string {
    return this.isEditMode ? "Modification de profil" : "Saisie d'un manager";
  }
}
