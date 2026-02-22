import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ManagerCPLModel} from "../../../../models/manager.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagerService} from "../../../../services/manager.service/manager.service";
import {PaymentLoyer, PaymentLoyerCPLModel} from "../../../../models/payment-loyer.model";
import {PaymentLoyerService} from "../../../../services/payment_loyer.service/payment-loyer.service";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {
  BonCommandeFactureComponent
} from "../../boutique/bon_commande/onglet/bon-commande-facture/bon-commande-facture.component";
import {
  BonCommandeFillesListeComponent
} from "../../../client/marketplace/bon_de_commande/onglet/bon-commande-filles-liste/bon-commande-filles-liste.component";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {StorageUtil} from "../../../../utils/storage.util";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";
import {PayementListeComponent} from "../../boutique/vente/onglet/payement-liste/payement-liste.component";
import {
  PaymentLoyerDecaissementListeComponent
} from "../onglet/payment-loyer-decaissement-liste/payment-loyer-decaissement-liste.component";
import {
  PaymentLoyerEncaissementListeComponent
} from "../onglet/payment-loyer-encaissement-liste/payment-loyer-encaissement-liste.component";

@Component({
  selector: 'app-payment-loyer-details',
  standalone: true,
  imports: [CommonModule, BonCommandeFactureComponent, BonCommandeFillesListeComponent, HeaderComponent, NavbarComponent, PayementListeComponent, PaymentLoyerDecaissementListeComponent, PaymentLoyerEncaissementListeComponent],
  templateUrl: './payment-loyer-details.component.html',
  styleUrl: './payment-loyer-details.component.css'
})
export class PaymentLoyerDetailsComponent {
  item?: PaymentLoyerCPLModel | null;
  loading = false;
  activeTab: 'tab1' = 'tab1';

  roleUser = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: PaymentLoyerService
  ) {}

  async ngOnInit(): Promise<void> {
    const auth = StorageUtil.getFromStorage<any>("auth");
    this.roleUser = auth.role.val;
    const id = this.route.snapshot.params['id'];
    if (id) {
      await this.loadItem(id);
    }
  }

  async loadItem(id: string): Promise<void> {
    this.loading = true;
    this.item = await this.itemService.getCPLById(id);
    this.loading = false;
  }

  // Changer d'onglet
  changeTab(tab: 'tab1'): void {
    this.activeTab = tab;
  }

  // Modifier le boxe
  editItem(): void {
    if (this.item?._id) {
      this.router.navigate(['owner/payment_loyer/update', this.item._id]);
    }
  }

  async deleteItem(): Promise<void> {
    if (this.item?._id) {
      await this.itemService.delete(this.item._id);
      this.router.navigate(['owner/payment_loyer']);
    }
  }

  // Retour à la liste
  goBack(): void {
    this.router.navigate(['owner/payment_loyer']);
  }

  async valider(): Promise<void> {
    let res = await this.itemService.valider(this.item?._id||'');
    if (this.item && res){
      this.item.status = ConstanteUtil.ETAT_VALIDER;
    }
  }

  async rejeter(): Promise<void> {
    let res = await this.itemService.rejeter(this.item?._id||'');
    if (this.item && res){
      this.item.status = ConstanteUtil.ETAT_REJETER;
    }
  }

  goToEncaissement(): void {
    if (this.item?._id) {
      this.router.navigate(
        ['caisse/mouvement/create'],
        {
          queryParams: {
            type: 'entrer',
            idSource: this.item._id,
            designation: `Encaissement du payment de loyer de la boutique ${this.item.boutique?.nom || ''} pour le mois de ${this.item.mois || ''} ${this.item.annee || ''}`,
            debit: this.item.montant || 0,
            maxDebit: this.item.montant || 0
          }
        }
      );
    }
  }

  goToDecaissement(): void {
    if (this.item?._id) {
      this.router.navigate(
        ['caisse/mouvement/create'],
        {
          queryParams: {
            type: 'sortie',
            idSource: this.item._id,
            designation: `Decaissement du payment de loyer de la boutique ${this.item.boutique?.nom || ''} pour le mois de ${this.item.mois || ''} ${this.item.annee || ''}`,
            credit: this.item.montant || 0,
            maxCredit: this.item.montant || 0
          }
        }
      );
    }
  }
  protected readonly PaymentLoyer = PaymentLoyer;
  protected readonly ConstanteUtil = ConstanteUtil;
  protected readonly UtilitaireUtil = UtilitaireUtil;
}
