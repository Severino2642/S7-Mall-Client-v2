import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MallService} from '../../../services/mall.service/mall.service';

@Component({
  selector: 'app-mall-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mall-register.component.html',
  styleUrl: './mall-register.component.css',
})
export class MallRegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mallService: MallService
  ) {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      adresse: ['', [Validators.required]],
      heure_ouverture:['08h00',Validators.required],
      heure_fermeture:['17h00',Validators.required],
      identifiant: ['', [Validators.required, Validators.email]],
      mdp: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      var res = this.mallService.createCentre(this.registerForm.value);
      if (res!=null){
        console.log('Centre créé', res);
        alert('Centre créé avec succès');
      }
      this.isLoading = false;
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
  get adresse() { return this.registerForm.get('adresse'); }
  get identifiant() { return this.registerForm.get('identifiant'); }
  get mdp() { return this.registerForm.get('mdp'); }
  get heure_ouverture() { return this.registerForm.get('heure_ouverture'); }
  get heure_fermeture() { return this.registerForm.get('heure_fermeture'); }

}
