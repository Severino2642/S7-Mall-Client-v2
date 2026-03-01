import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service/auth.service';
import {MallService} from '../../../services/mall.service/mall.service';
import {firstValueFrom} from 'rxjs';
import {ProprietaireService} from "../../../services/proprietaire.service/proprietaire.service";
import {ClientService} from "../../../services/client.service/client.service";
import {PanierService} from "../../../services/panier.service/panier.service";
import {ManagerService} from "../../../services/manager.service/manager.service";
import {StorageUtil} from "../../../utils/storage.util";
import {BoutiqueService} from "../../../services/boutique.service/boutique.service";

@Component({
  selector: 'app-login.component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  listRoles = ['Centre Commercial', 'Proprietaire', 'Client', 'Manager'];
  role = this.listRoles[0];
  defaultLogin = [
    {
      role: 'Centre Commercial',
      identifiant: 'olympia@gmail.com',
      mdp: '12345678'
    },
    {
      role: 'Proprietaire',
      identifiant: 'jeanmichel@gmail.com',
      mdp: '12345678'
    },
    {
      role: 'Client',
      identifiant: 'jose@gmail.com',
      mdp: '12345678'
    },
    {
      role: 'Manager',
      identifiant: 'severino@gmail.com',
      mdp: '12345678'
    }
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private mallService: MallService,
    private proprietaireService: ProprietaireService,
    private clientService: ClientService,
    private panierService: PanierService,
    private managerService: ManagerService,
    private boutiqueService: BoutiqueService
  ) {
    this.loginForm = this.fb.group({
      identifiant: ['', [Validators.required, Validators.email]],
      mdp: ['', [Validators.required]],
      rememberMe: [false]
    });
    this.changeDefaultLogin();
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
        const mall = await this.mallService.getCPLById(res.idUser);
        console.log("User is a mall:", mall);
        localStorage.setItem('mall', JSON.stringify(mall));
      }

      if (res.role?.val === "Proprietaire") {
        redirection = "/owner/offreLocation/liste";
        const mall = await this.proprietaireService.getById(res.idUser);
        console.log("User is a owner:", mall);
        localStorage.setItem('owner', JSON.stringify(mall));
      }

      if (res.role?.val === "Client") {
        redirection = "client/market/produit";
        const mall = await this.clientService.getById(res.idUser);
        console.log("User is a client:", mall);
        localStorage.setItem('client', JSON.stringify(mall));
        const panier = await this.panierService.getCPLByIdClient(res.idUser);
        let totalItems = panier ? panier.reduce((total, item) => total + (item.quantite || 0), 0) : 0;
        console.log("Panier du client:", panier);
        localStorage.setItem('cartItemsCount', panier ? totalItems.toString() : "0");
      }

      if (res.role?.val === "Manager") {
        redirection = "boutique/produit";
        const mall = await this.managerService.getById(res.idUser);
        if (mall?.status==3){
          StorageUtil.clear();
          this.errorMessage = "Votre compte a été suspendu, veuillez contacter l'administration pour plus d'informations.";
          alert("Votre compte a été suspendu, veuillez contacter l'administration pour plus d'informations.");
          return;
        }
        const boutique = await this.boutiqueService.getById(mall?.idBoutique || "");
        StorageUtil.setToStorage("boutique", boutique);
        localStorage.setItem('manager', JSON.stringify(mall));
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

  changeDefaultLogin(): void {
    const selectedLogin = this.defaultLogin.find(login => login.role === this.role);
    if (selectedLogin) {
      console.log('Selected default login:', selectedLogin);
      this.loginForm.patchValue({
        identifiant: selectedLogin.identifiant,
        mdp: selectedLogin.mdp
      });
    }
  }
}
