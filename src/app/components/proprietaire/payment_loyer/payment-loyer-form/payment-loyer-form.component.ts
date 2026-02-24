import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ManagerCPLModel} from "../../../../models/manager.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BoutiqueCPLModel} from "../../../../models/boutique.model";
import {ManagerService} from "../../../../services/manager.service/manager.service";
import {BoutiqueService} from "../../../../services/boutique.service/boutique.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {MouvementCaisseModel} from "../../../../models/mouvement-caisse.model";
import {BoxeModel} from "../../../../models/boxe.model";
import {PaymentLoyerModel} from "../../../../models/payment-loyer.model";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {PaymentLoyerService} from "../../../../services/payment_loyer.service/payment-loyer.service";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {LocationBoxeCPLModel, LocationBoxeModel} from "../../../../models/location-boxe.model";
import {LocationBoxeService} from "../../../../services/location_boxe.service/location-boxe.service";

@Component({
  selector: 'app-payment-loyer-form',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, ReactiveFormsModule],
  templateUrl: './payment-loyer-form.component.html',
  styleUrl: './payment-loyer-form.component.css'
})
export class PaymentLoyerFormComponent {
  @Input() item?: PaymentLoyerModel | null; // Données à modifier (null pour création)
  @Output() onSubmit = new EventEmitter<PaymentLoyerModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;
  id = null;
  loading = false;
  listBoutique: LocationBoxeCPLModel[] = [];
  listMois = ConstanteUtil.listeMois;

  constructor(
    private fb: FormBuilder,
    private itemService:PaymentLoyerService,
    private boutiqueService: LocationBoxeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    await this.loadListeBoutique();
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
    var res = await this.boutiqueService.getDisponibleCPLByIdProprietaire(auth.idUser);
    if (res!=null){
      this.listBoutique = res;
    }
    this.loading = false;
  }

  // Initialiser le formulaire
  initForm(): void {
    this.boxeForm = this.fb.group({
      idBoutique: [this.item?.idBoutique || '', [Validators.required]],
      mois: [this.item?.mois || '', [Validators.required]],
      annee: [this.item?.annee || '', [Validators.required, Validators.min(2025)]],
      montant: [this.item?.montant || '', [Validators.required, Validators.min(0)]],
      date: [UtilitaireUtil.getFormattedDate(this.item?.date) || '', [Validators.required]],
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
      const boutique = this.listBoutique.find(b => b._id === this.boxeForm.value.idBoutique);
      const formData: MouvementCaisseModel = {
        ...this.boxeForm.value,
        idCentreCommercial: boutique?.centreCommercial?._id,
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
    this.router.navigate([`owner/payment_loyer/details/${res._id}`]);
    this.loading = false;
  }

  async updateItem(formData: BoxeModel): Promise<void> {
    this.loading = true;
    await this.itemService.update(this.id!, formData);
    this.router.navigate([`owner/payment_loyer/details/${this.id}`]);
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
    return this.isEditMode ? "Modification d'un payment de loyer" : "Saisie d'un payment de loyer";
  }
}
