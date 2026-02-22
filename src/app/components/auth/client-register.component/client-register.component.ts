import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {ProprietaireService} from "../../../services/proprietaire.service/proprietaire.service";
import {ImagekitService} from "../../../services/imagekit.service/imagekit.service";
import {ClientService} from "../../../services/client.service/client.service";
import {ConstanteUtil} from "../../../utils/constante.util";
import {UtilitaireUtil} from "../../../utils/utilitaire.util";

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.css',
})
export class ClientRegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  listSexe = [
    {"val": ConstanteUtil.sexe.Homme , "label": "Homme"},
    {"val": ConstanteUtil.sexe.Femme , "label": "Femme"},
    {"val": ConstanteUtil.sexe.Autre , "label": "Autre"},
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private clientService: ClientService,
    private imagekitService: ImagekitService
  ) {
    this.registerForm = this.fb.group({
      pdp: [''],
      nom: [''],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      adresse: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      sexe: ['', [Validators.required]],
      date_naissance: ['', [Validators.required]],
      identifiant: ['', [Validators.required, Validators.minLength(3)]],
      mdp: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.ngZone.run(() => {
          this.imagePreview = e.target.result;
        });
      };
      reader.readAsDataURL(file);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      let imageUrl = '';

      // 1. Upload l'image si un fichier est sélectionné
      if (this.selectedFile) {
        try {
          console.log('📤 Upload de l\'image vers ImageKit...');

          // Upload effectif
          imageUrl = await this.imagekitService.uploadImage(
            this.selectedFile,
            '/client' // Dossier de destination
          );

          console.log('✅ Image uploadée avec succès:', imageUrl);

          // Met à jour le formulaire avec l'URL
          this.registerForm.patchValue({ pdp: imageUrl });

        } catch (uploadError: any) {
          console.error('❌ Erreur upload:', uploadError);
          this.errorMessage = uploadError.message || 'Erreur lors de l\'upload de l\'image';
          this.isLoading = false;
          return;
        }
      }

      // 2. Création du propriétaire
      const formData = { ...this.registerForm.value };

      // Convertir la date au bon format pour MongoDB
      if (formData.date_naissance) {
        formData.date_naissance = new Date(formData.date_naissance).toISOString();
      }

      const response = await this.clientService.create(formData);

      if (response){
        console.log('✅ Propriétaire créé avec succès:', response);
        alert('Inscription réussie !');
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      console.error('❌ Erreur:', error);
      this.errorMessage = error.error?.message || error.message || 'Une erreur est survenue';
    } finally {
      this.isLoading = false;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get nom() { return this.registerForm.get('nom'); }
  get prenom() { return this.registerForm.get('prenom'); }
  get adresse() { return this.registerForm.get('adresse'); }
  get contact() { return this.registerForm.get('contact'); }
  get identifiant() { return this.registerForm.get('identifiant'); }
  get mdp() { return this.registerForm.get('mdp'); }
  get sexe() { return this.registerForm.get('sexe'); }
  get date_naissance() { return this.registerForm.get('date_naissance'); }
}
