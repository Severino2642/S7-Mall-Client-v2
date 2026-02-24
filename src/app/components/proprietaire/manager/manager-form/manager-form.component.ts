import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MouvementCaisseModel} from "../../../../models/mouvement-caisse.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CaisseModel} from "../../../../models/caisse.model";
import {MouvementCaisseService} from "../../../../services/mouvement_caisse.service/mouvement-caisse.service";
import {CaisseService} from "../../../../services/caisse.service/caisse.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {BoutiqueCPLModel, BoutiqueModel} from "../../../../models/boutique.model";
import {BoxeModel} from "../../../../models/boxe.model";
import {ManagerCPLModel, ManagerModel} from "../../../../models/manager.model";
import {ManagerService} from "../../../../services/manager.service/manager.service";
import {BoutiqueService} from "../../../../services/boutique.service/boutique.service";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";

@Component({
  selector: 'app-manager-form',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, ReactiveFormsModule],
  templateUrl: './manager-form.component.html',
  styleUrl: './manager-form.component.css'
})
export class ManagerFormComponent {
  @Input() item?: ManagerCPLModel | null; // Données à modifier (null pour création)
  @Output() onSubmit = new EventEmitter<ManagerCPLModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;
  id = null;
  loading = false;
  listBoutique: BoutiqueCPLModel[] = [];

  constructor(
    private fb: FormBuilder,
    private itemService:ManagerService,
    private boutiqueService: BoutiqueService,
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
    var res = await this.boutiqueService.getByIdProprietaire(auth.idUser);
    if (res!=null){
      this.listBoutique = res;
    }
    this.loading = false;
  }

  // Initialiser le formulaire
  initForm(): void {
    this.boxeForm = this.fb.group({
      idBoutique: [this.item?.idBoutique || '', [Validators.required]],
      nom: [this.item?.nom || ''],
      prenom: [this.item?.prenom || '', [Validators.required]],
      email: [this.item?.email || '', [Validators.email]],
      contact: [this.item?.contact || ''],
      identifiant: [this.item?.authentification?.identifiant || '', [Validators.email]],
      mdp: ['', this.isEditMode ? [Validators.minLength(6)] : [Validators.required, Validators.minLength(6)]]
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
    this.router.navigate([`owner/manager/details/${res._id}`]);
    this.loading = false;
  }

  async updateItem(formData: BoxeModel): Promise<void> {
    this.loading = true;
    await this.itemService.update(this.id!, formData);
    this.router.navigate([`owner/manager/details/${this.id}`]);
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
    return this.isEditMode ? "Modification d'un manager" : "Saisie d'un manager";
  }
}
