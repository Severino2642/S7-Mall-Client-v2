import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service/auth.service';
import {MallService} from '../../../services/mall.service/mall.service';
import {firstValueFrom} from 'rxjs';
import {ProprietaireService} from "../../../services/proprietaire.service/proprietaire.service";

@Component({
  selector: 'app-login.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private mallService: MallService,
    private proprietaireService: ProprietaireService
  ) {
    this.loginForm = this.fb.group({
      identifiant: ['', [Validators.required, Validators.email]],
      mdp: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  async onSubmit(): Promise<void> {
    if (!this.loginForm.valid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      // login
      const res: any = await firstValueFrom(
        this.authService.login(this.loginForm.value)
      );
      console.log('Login successful', res);

      localStorage.setItem('auth', JSON.stringify(res));

      // redirection par défaut
      let redirection = '/admin/boxe';

      // si c'est un centre commercial
      if (res.role?.val === "Centre Commercial") {
        const mall = await this.mallService.getById(res.idUser);
        console.log("User is a mall:", mall);
        localStorage.setItem('mall', JSON.stringify(mall));
      }

      if (res.role?.val === "Proprietaire") {
        const mall = await this.proprietaireService.getById(res.idUser);
        console.log("User is a owner:", mall);
        localStorage.setItem('owner', JSON.stringify(mall));
      }

      // navigation
      this.router.navigate([redirection]);

    } catch (err: any) {
      console.error(err);
      this.errorMessage = err.error?.message || 'Server error';
      alert(this.errorMessage);
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

  get identifiant() {
    return this.loginForm.get('identifiant');
  }

  get mdp() {
    return this.loginForm.get('mdp');
  }
}
