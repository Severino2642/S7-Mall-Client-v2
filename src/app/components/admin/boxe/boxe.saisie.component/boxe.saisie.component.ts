import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NavbarComponent} from '../../navbar.component/navbar.component';
import {HeaderComponent} from '../../header.component/header.component';
import {BoxeModel} from '../../../../models/boxe.model';
import {BoxeService} from '../../../../services/boxe.service/boxe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageUtil} from '../../../../utils/storage.util';

@Component({
  selector: 'app-boxe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, HeaderComponent],
  templateUrl: './boxe.saisie.component.html',
  styleUrls: ['./boxe.saisie.component.css']
})
export class BoxeSaisieComponent implements OnInit {
  @Input() item?: BoxeModel | null; // Données à modifier (null pour création)
  @Output() onSubmit = new EventEmitter<BoxeModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;
  id = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private boxeService:BoxeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
      nom: [this.item?.nom || '', [Validators.required, Validators.minLength(2)]],
      description: [this.item?.description || ''],
      longueur: [this.item?.longueur || '',[Validators.min(1),Validators.required]],
      largeur: [this.item?.largeur || '',[Validators.min(1),Validators.required]],
    });
  }

  async loadItem(id: string): Promise<void> {
    this.loading = true;
    this.item = await this.boxeService.getById(id);
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
      var mall = StorageUtil.getFromStorage<any>("mall");
      formData.idCentreCommercial = mall._id;

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
    var res = await this.boxeService.create(formData);
    this.router.navigate([`admin/boxe/details/${res._id}`]);
    this.loading = false;
  }

  async updateItem(formData: BoxeModel): Promise<void> {
    this.loading = true;
    await this.boxeService.update(this.id!, formData);
    this.router.navigate([`admin/boxe/details/${this.id}`]);
    this.loading = false;
  }
  // Annuler
  cancel(): void {
    this.onCancel.emit();
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.boxeForm.reset({
      nom: '',
      description: '',
      longueur: 0,
      largeur: 0
    });
  }

  getTitre(): string {
    return this.isEditMode ? "Modification d'une boxe" : "Créer une nouvelle boxe";
  }
}
