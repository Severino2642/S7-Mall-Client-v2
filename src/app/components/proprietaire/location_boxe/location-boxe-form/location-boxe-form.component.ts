import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaymentLoyerModel} from "../../../../models/payment-loyer.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LocationBoxe, LocationBoxeCPLModel, LocationBoxeModel} from "../../../../models/location-boxe.model";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {PaymentLoyerService} from "../../../../services/payment_loyer.service/payment-loyer.service";
import {LocationBoxeService} from "../../../../services/location_boxe.service/location-boxe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";
import {MouvementCaisseModel} from "../../../../models/mouvement-caisse.model";
import {BoxeModel} from "../../../../models/boxe.model";
import {BoutiqueCPLModel} from "../../../../models/boutique.model";
import {BoutiqueService} from "../../../../services/boutique.service/boutique.service";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-location-boxe-form',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './location-boxe-form.component.html',
  styleUrl: './location-boxe-form.component.css'
})
export class LocationBoxeFormComponent {
  @Input() item?: LocationBoxeModel | null; // Données à modifier (null pour création)
  @Output() onSubmit = new EventEmitter<LocationBoxeModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;
  id = null;
  loading = false;
  listBoutique: BoutiqueCPLModel[] = [];
  userRole = "";
  listJoursDuMois = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  constructor(
    private fb: FormBuilder,
    private itemService:LocationBoxeService,
    private boutiqueService: BoutiqueService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const auth = StorageUtil.getFromStorage<any>("auth");
    this.userRole = auth.role.val;
    this.id = this.route.snapshot.params['id'];
    if (this.userRole === ConstanteUtil.role_proprietaire) {
      await this.loadListeBoutique();
    }
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

  async loadListeBoutique(): Promise<void> {
    this.loading = true;
    const auth = StorageUtil.getFromStorage<any>("auth");
    var res = await this.boutiqueService.getByIdProprietaire(auth.idUser);
    if (res!=null){
      this.listBoutique = res;
    }
    this.loading = false;
  }

  // Initialiser le formulaire
  initForm(): void {
    this.boxeForm = this.fb.group({
      loyer: [this.item?.loyer || '', [Validators.min(0)]],
      echeance_payment: [this.item?.echeance_payment || '', [Validators.min(1)]],
      date_expiration: [UtilitaireUtil.getFormattedDate(this.item?.date_expiration) || ''],
      idBoutique: [this.item?.idBoutique || ''],
    });
  }

  async loadItem(id: string): Promise<void> {
    this.loading = true;
    this.item = await this.itemService.getCPLById(id);
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
      const formData: LocationBoxeModel = {
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

  async createItem(formData: LocationBoxeModel): Promise<void> {
    this.loading = true;
    var res = await this.itemService.create(formData);
    this.router.navigate([`owner/location_boxe/details/${res._id}`]);
    this.loading = false;
  }

  async updateItem(formData: LocationBoxeModel): Promise<void> {
    this.loading = true;
    await this.itemService.update(this.id!, formData);
    this.router.navigate([`owner/location_boxe/details/${this.id}`]);
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
    return this.isEditMode ? "Modification du contrat de location" : "Saisie d'un payment de loyer";
  }

  protected readonly ConstanteUtil = ConstanteUtil;
}
