import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './owner-register.component.html',
  styleUrl: './owner-register.component.css',
})
export class OwnerRegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.registerForm = this.fb.group({
      pdp: [''],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      adresse: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      setTimeout(() => {
        this.isLoading = false;
        console.log('Owner registration data:', this.registerForm.value);
        // TODO: Implémenter la logique d'inscription avec le backend
      }, 1500);
    } else {
      this.markFormGroupTouched(this.registerForm);
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
  get email() { return this.registerForm.get('email'); }
  get date_naissance() { return this.registerForm.get('date_naissance'); }
  get identifiant() { return this.registerForm.get('identifiant'); }
  get mdp() { return this.registerForm.get('mdp'); }
}
