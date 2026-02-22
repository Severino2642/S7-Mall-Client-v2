import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OffreDeLocationModel} from "../../../../models/offre_location.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BoxeModel} from "../../../../models/boxe.model";
import {OffreLocationServiceService} from "../../../../services/offre_location.service/offre-location.service.service";
import {BoxeService} from "../../../../services/boxe.service/boxe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {MouvementCaisse, MouvementCaisseModel} from "../../../../models/mouvement-caisse.model";
import {CaisseModel} from "../../../../models/caisse.model";
import {MouvementCaisseService} from "../../../../services/mouvement_caisse.service/mouvement-caisse.service";
import {CaisseService} from "../../../../services/caisse.service/caisse.service";
import {BoutiqueModel} from "../../../../models/boutique.model";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {CommonModule, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-mouvement-caisse-form',
  standalone: true,
  imports: [
    FormsModule,
    HeaderComponent,
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './mouvement-caisse-form.component.html',
  styleUrl: './mouvement-caisse-form.component.css'
})
export class MouvementCaisseFormComponent {
  @Input() item?: MouvementCaisseModel | null; // Données à modifier (null pour création)
  @Output() onSubmit = new EventEmitter<MouvementCaisseModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;
  id = null;
  loading = false;
  listCaisse: CaisseModel[] = [];

  idProprietaire = "";
  typeMouvement = "";
  constructor(
    private fb: FormBuilder,
    private itemService:MouvementCaisseService,
    private caisseService: CaisseService,
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
    await this.loadListeCaisse();
    if (this.id!=null && this.id!="") {
      // Mode modification
      this.loadItem(this.id);
      this.isEditMode = true;
    } else {
      // Mode création
      this.isEditMode = false;
      this.initForm();
      this.initDefaultValues();
    }
  }

  initDefaultValues(): void {
    if (!this.isEditMode) {
      this.typeMouvement = this.route.snapshot.queryParams['type']||'';

      let idSource = this.route.snapshot.queryParams['idSource'];
      if (idSource) {
        this.boxeForm.patchValue({ idSource: idSource });
      }
      let debit = this.route.snapshot.queryParams['debit'];
      if (debit) {
        this.boxeForm.patchValue({ debit: debit });
      }
      let credit = this.route.snapshot.queryParams['credit'];
      if (credit) {
        this.boxeForm.patchValue({ credit: credit });
      }
      let designation = this.route.snapshot.queryParams['designation'];
      if (designation) {
        this.boxeForm.patchValue({ designation: designation });
      }
      let maxDebit = this.route.snapshot.queryParams['maxDebit'];
      if (maxDebit) {
        this.boxeForm.get('debit')?.setValidators([Validators.required, Validators.min(0), Validators.max(Number(maxDebit))]);
        this.boxeForm.get('debit')?.updateValueAndValidity();
      }
      let maxCredit = this.route.snapshot.queryParams['maxCredit'];
      if (maxCredit) {
        this.boxeForm.get('credit')?.setValidators([Validators.required, Validators.min(0), Validators.max(Number(maxCredit))]);
        this.boxeForm.get('credit')?.updateValueAndValidity();
      }
    }
  }
  async loadListeCaisse(): Promise<void> {
    this.loading = true;
    var res = await this.caisseService.getAllByidProprietaire(this.idProprietaire);
    if (res!=null){
      this.listCaisse = res;
    }
    this.loading = false;
  }

  // Initialiser le formulaire
  initForm(): void {
    this.boxeForm = this.fb.group({
      idCaisse: [this.item?.idCaisse || '', [Validators.required]],
      idSource: [this.item?.idSource || '',],
      designation: [this.item?.designation || ''],
      debit: [this.item?.debit || ''],
      credit: [this.item?.credit || ''],
      date: [this.item?.date || '',[Validators.required]],
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
    var res = await this.itemService.create(formData);
    this.router.navigate([`caisse/mouvement/details/${res._id}`]);
    this.loading = false;
  }

  async updateItem(formData: BoxeModel): Promise<void> {
    this.loading = true;
    await this.itemService.update(this.id!, formData);
    this.router.navigate([`caisse/mouvement/details/${this.id}`]);
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
    return this.isEditMode ? "Modification d'un mouvement de caisse" : "Saisie d'un mouvement de caisse";
  }
}
