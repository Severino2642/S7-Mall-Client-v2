import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VenteModel} from "../../../../models/vente.model";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientService} from "../../../../services/client.service/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {BoutiqueModel} from "../../../../models/boutique.model";
import {ClientModel} from "../../../../models/client.model";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {ProduitModel} from "../../../../models/produit.model";

@Component({
  selector: 'app-client-form-min',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './client-form-min.component.html',
  styleUrl: './client-form-min.component.css'
})
export class ClientFormMinComponent {
  @Input() item?: ClientModel | null;
  @Output() onSubmit = new EventEmitter<ClientModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;


  listSexe = [
    {"val": ConstanteUtil.sexe.Homme , "label": "Homme"},
    {"val": ConstanteUtil.sexe.Femme , "label": "Femme"},
    {"val": ConstanteUtil.sexe.Autre , "label": "Autre"},
  ];

  constructor(
    private fb: FormBuilder,
    private itemService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.initForm();
  }

  initForm(): void {
    this.boxeForm = this.fb.group({
      nom: [this.item?.nom || ''],
      prenom: [this.item?.prenom || '', [Validators.required]],
      sexe: [this.item?.sexe || '', [Validators.required]],
      adresse: [this.item?.adresse || ''],
      contact: [this.item?.contact || ''],
      date_naissance: [UtilitaireUtil.getFormattedDate(this.item?.date_naissance), [Validators.required]]
    });
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

  async submitForm(): Promise<void> {
    if (this.boxeForm.valid) {
      const formData: ClientModel = {
        ...this.boxeForm.value
      };
      formData.idBoutique = StorageUtil.getFromStorage<BoutiqueModel>("boutique")?._id || undefined;

      let item = await this.itemService.create(formData);

      this.onSubmit.emit(item);
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.boxeForm.controls).forEach(key => {
        this.boxeForm.get(key)?.markAsTouched();
      });
    }
  }

  // Annuler
  cancel(): void {
    this.onCancel.emit();
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.boxeForm.reset({
      nom: '',
      prenom: '',
      sexe: '',
      adresse: '',
      contact: '',
      date_naissance: ''
    });
  }
}
