import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProprietaireModel} from "../../../../models/proprietaire.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProprietaireService} from "../../../../services/proprietaire.service/proprietaire.service";
import {StorageUtil} from "../../../../utils/storage.util";
import {ClientModel} from "../../../../models/client.model";
import {ClientService} from "../../../../services/client.service/client.service";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {HeaderComponent} from "../../header.component/header.component";

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {
  item?: ClientModel | null;
  loading = false;
  activeTab: 'tab1'|'tab2'|'tab3' = 'tab1';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ClientService
  ) {}

  async ngOnInit(): Promise<void> {
    const auth = StorageUtil.getFromStorage<any>("auth");
    const id = this.route.snapshot.params['id'];
    if (id) {
      await this.loadItem(id);
    }
  }

  async loadItem(id: string): Promise<void> {
    this.loading = true;
    this.item = await this.itemService.getById(id);
    this.loading = false;
  }

  // Changer d'onglet
  changeTab(tab: 'tab1'|'tab2'|'tab3'): void {
    this.activeTab = tab;
  }

  editItem(): void {
    if (this.item?._id) {
      this.router.navigate(['client/update', this.item._id]);
    }
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
  protected readonly ConstanteUtil = ConstanteUtil;
}
