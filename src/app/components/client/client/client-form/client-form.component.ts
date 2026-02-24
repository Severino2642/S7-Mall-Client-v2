import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProprietaireModel} from "../../../../models/proprietaire.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProprietaireService} from "../../../../services/proprietaire.service/proprietaire.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ImagekitService} from "../../../../services/imagekit.service/imagekit.service";
import {StorageUtil} from "../../../../utils/storage.util";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";
import {MouvementCaisseModel} from "../../../../models/mouvement-caisse.model";
import {BoxeModel} from "../../../../models/boxe.model";
import {ClientModel} from "../../../../models/client.model";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {HeaderComponent} from "../../header.component/header.component";
import {ClientService} from "../../../../services/client.service/client.service";

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  @Input() item?: ClientModel | null; // Données à modifier (null pour création)
  @Output() onSubmit = new EventEmitter<ClientModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;
  id = null;
  loading = false;
  selectedFile: File | null = null;
  listSexe = [
    {"val": ConstanteUtil.sexe.Homme , "label": "Homme"},
    {"val": ConstanteUtil.sexe.Femme , "label": "Femme"},
    {"val": ConstanteUtil.sexe.Autre , "label": "Autre"},
  ];

  constructor(
    private fb: FormBuilder,
    private itemService:ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private imagekitService: ImagekitService
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
      pdp:[this.item?.pdp||''],
      nom: [this.item?.nom || ''],
      prenom: [this.item?.prenom || '',[Validators.required]],
      sexe: [this.item?.sexe || '', [Validators.required]],
      adresse: [this.item?.adresse || ''],
      contact: [this.item?.contact || '', [Validators.required]],
      date_naissance: [UtilitaireUtil.getFormattedDate(this.item?.date_naissance) || '', [Validators.required]],
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux (max 5MB)');
        event.target.value = ''; // Reset l'input
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Type de fichier non supporté (JPG, PNG, GIF, WebP uniquement)');
        event.target.value = '';
        return;
      }

      this.selectedFile = file;
    }
  }

  // Soumettre le formulaire
  async submitForm(): Promise<void> {
    this.loading = true;
    if (this.boxeForm.valid) {

      let imageUrl = '';

      // 1. Upload l'image si un fichier est sélectionné
      if (this.selectedFile) {
        try {
          console.log('📤 Upload de l\'image vers ImageKit...');

          // Upload effectif
          imageUrl = await this.imagekitService.uploadImage(
            this.selectedFile,
            '/proprietaires' // Dossier de destination
          );

          console.log('✅ Image uploadée avec succès:', imageUrl);

          // Met à jour le formulaire avec l'URL
          this.boxeForm.patchValue({ pdp: imageUrl });

        } catch (uploadError: any) {
          console.error('❌ Erreur upload:', uploadError);
          this.loading = false;
          return;
        }
      }

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
    this.router.navigate([`client/details/${res._id}`]);
    this.loading = false;
  }

  async updateItem(formData: BoxeModel): Promise<void> {
    this.loading = true;
    await this.itemService.update(this.id!, formData);
    this.router.navigate([`client/details/${this.id}`]);
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
