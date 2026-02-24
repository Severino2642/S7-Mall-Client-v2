import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MouvementCaisseCPLModel} from "../../../../models/mouvement-caisse.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MouvementCaisseService} from "../../../../services/mouvement_caisse.service/mouvement-caisse.service";
import {Manager, ManagerCPLModel} from "../../../../models/manager.model";
import {ManagerService} from "../../../../services/manager.service/manager.service";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";

@Component({
  selector: 'app-manager-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, RouterLink],
  templateUrl: './manager-details.component.html',
  styleUrl: './manager-details.component.css'
})
export class ManagerDetailsComponent {
  item?: ManagerCPLModel | null;
  loading = false;
  activeTab: 'tab1' = 'tab1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ManagerService
  ) {}

  async ngOnInit(): Promise<void> {
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
      this.router.navigate(['owner/manager/update', this.item._id]);
    }
  }

  async deleteItem(): Promise<void> {
    if (this.item?._id) {
      await this.itemService.delete(this.item._id);
      this.router.navigate(['owner/manager']);
    }
  }

  // Retour à la liste
  goBack(): void {
    this.router.navigate(['owner/manager']);
  }

  async setStatus(): Promise<void> {
    let newStatus = ConstanteUtil.ETAT_DISPONIBLE;
    if (this.item?.status == ConstanteUtil.ETAT_DISPONIBLE) {
      newStatus = ConstanteUtil.ETAT_OCCUPEE;
    }
    await this.itemService.changerStatus(this.item?._id || '', newStatus);
    if (this.item){
      this.item.status = newStatus;
    }
  }

  protected readonly Manager = Manager;
  protected readonly ConstanteUtil = ConstanteUtil;
}
