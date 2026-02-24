import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProduitModel} from "../../../../../models/produit.model";
import {ProduitService} from "../../../../../services/produit.service/produit.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";
import {StorageUtil} from "../../../../../utils/storage.util";
import {VenteModel} from "../../../../../models/vente.model";
import {VenteDetailsModel} from "../../../../../models/vente-details.model";
import {VenteService} from "../../../../../services/vente.service/vente.service";
import {ClientModel} from "../../../../../models/client.model";
import {ClientService} from "../../../../../services/client.service/client.service";
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";
import {BoutiqueModel} from "../../../../../models/boutique.model";
import {ClientFormMinComponent} from "../../../../client/client/client-form-min/client-form-min.component";
import * as bootstrap from 'bootstrap';
import {ConstanteUtil} from "../../../../../utils/constante.util";
import {BonDeCommandeService} from "../../../../../services/bon-de-commande.service/bon-de-commande.service";

export interface FilleModel extends VenteDetailsModel {
  selected?: boolean;
}

@Component({
  selector: 'app-vente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, NavbarComponent, ReactiveFormsModule, ClientFormMinComponent],
  templateUrl: './vente-form.component.html',
  styleUrl: './vente-form.component.css'
})

export class VenteFormComponent {
  // Mere
  @Input() item?: VenteModel | null;
  @Output() onSubmit = new EventEmitter<VenteModel>();
  @Output() onCancel = new EventEmitter<void>();

  boxeForm!: FormGroup;
  isEditMode = false;
  id = null;
  loading = false;
  listProduit: ProduitModel[] = [];
  listClient:ClientModel[]=[];
  // Filles
  @Input() initialFilles: VenteDetailsModel[] = [];
  filles: FilleModel[] = [];
  selectAll = false;

  idBoutique = "";
  constructor(
    private fb: FormBuilder,
    private itemService:VenteService,
    private produitService: ProduitService,
    private clientService: ClientService,
    private bonDeCommandeService: BonDeCommandeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const boutique = StorageUtil.getFromStorage<BoutiqueModel>("boutique");
    this.idBoutique = boutique?._id || "";

    this.id = this.route.snapshot.params['id'];
    await this.loadListeProduit();
    await this.loadListeClient();
    if (this.id!=null && this.id!="") {
      // Mode modification
      await this.loadItem(this.id);
      this.isEditMode = true;
    } else {
      // Mode création
      this.isEditMode = false;
      const idSource = this.route.snapshot.queryParams['idSource'];
      if (idSource) {
        await this.loadByIdSource(idSource);
      }
      this.initForm();
    }
    if (this.initialFilles && this.initialFilles.length > 0) {
      this.filles = this.initialFilles.map(f => ({ ...f, selected: true }));
    } else {
      this.addRow();
    }
  }


  async loadListeProduit(): Promise<void> {
    this.loading = true;
    var res = await this.produitService.getAllByIdBoutique(this.idBoutique,ConstanteUtil.ETAT_DISPONIBLE);
    if (res!=null){
      this.listProduit = res;
    }
    this.loading = false;
  }

  async loadListeClient(): Promise<void> {
    this.loading = true;
    var res = await this.clientService.getByIdBoutique(this.idBoutique);
    if (res!=null){
      this.listClient = res;
    }
    this.loading = false;
  }

  // Initialiser le formulaire
  initForm(): void {
    this.boxeForm = this.fb.group({
      idSource: [this.item?.idSource || ''],
      idClient: [this.item?.idClient || '', [Validators.required]],
      designation: [this.item?.designation || ''],
      date: [UtilitaireUtil.getFormattedDate(this.item?.date), [Validators.required]]
    });
  }

  async loadItem(id: string): Promise<void> {
    this.loading = true;
    const res = await this.itemService.getCPLById(id);
    this.item = res;
    if (res?.filles){
      this.initialFilles = res?.filles;
    }
    this.initForm(); // Le formulaire se remplit automatiquement
    this.loading = false;
  }

  async loadByIdSource(idSource: string): Promise<void> {
    this.loading = true;
    if (idSource.startsWith("bcmd_")) {
      const source = await this.bonDeCommandeService.getCPLById(idSource);
      if (source) {
        this.item = {
          idSource: source._id,
          idClient: source.idClient,
          designation: "Vente liée à la commande " + source._id
        };
        this.initialFilles = source.filles ? source.filles.map(f => ({
          idProduit: f.idProduit,
          quantite: f.quantite,
          prixUnitaire: f.prixUnitaire,
        })) : [];
      }
    }
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
    if (this.boxeForm.valid && this.validateFormFille()) {
      const formData: ProduitModel = {
        ...this.boxeForm.value,
        idBoutique:this.idBoutique
      };

      const cleanedFilles = this.filles
        .filter(fille => fille.selected)
        .map(({ selected, ...cleanFile }) => ({ ...cleanFile }));

      if (this.isEditMode && this.id) {
        formData._id = this.id;
        this.updateItem(formData, cleanedFilles);
      }
      else {
        // MODE CRÉATION
        this.createItem(formData, cleanedFilles);
      }

      this.onSubmit.emit(formData);
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.boxeForm.controls).forEach(key => {
        this.boxeForm.get(key)?.markAsTouched();
      });
    }
  }

  async createItem(formData: any,filles:any): Promise<void> {
    this.loading = true;
    const bigData = {
      mere: formData,
      filles: filles
    }
    var res = await this.itemService.createMereFille(bigData);
    this.router.navigate([`boutique/vente/details/${res._id}`]);
    this.loading = false;
  }

  async updateItem(formData: any,filles:any): Promise<void> {
    this.loading = true;
    const bigData = {
      mere: formData,
      filles: filles
    }
    await this.itemService.updateMereFille(this.id!, bigData);
    this.router.navigate([`boutique/vente/details/${this.id}`]);
    this.loading = false;
  }

  // Annuler
  cancel(): void {
    this.onCancel.emit();
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.boxeForm.reset({
      idBoxe: '',
      description: '',
      montantLoyer: 0,
    });
  }

  getTitre(): string {
    return this.isEditMode ? "Modification d'une vente" : "Saisie d'une vente";
  }

  addRow(): void {
    const newFile: FilleModel = {
      _id: undefined,
      idProduit: '',
      quantite: 0,
      prixUnitaire: 0,
      remarque: '',
      remise:0,
      selected: false
    };
    this.filles.push(newFile);
  }

  // Supprimer une ligne spécifique
  deleteRow(index: number): void {
    this.filles.splice(index, 1);
    this.updateSelectAll();

    // Ajouter une ligne vide si le tableau est vide
    if (this.filles.length === 0) {
      this.addRow();
    }
  }

  // Supprimer les lignes sélectionnées
  deleteSelected(): void {
    const selectedCount = this.getSelectedCount();

    if (selectedCount === 0) {
      alert('Aucune ligne sélectionnée');
      return;
    }

    if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedCount} ligne(s) ?`)) {
      this.filles = this.filles.filter(fille => !fille.selected);
      this.selectAll = false;

      // Ajouter une ligne vide si le tableau est vide
      if (this.filles.length === 0) {
        this.addRow();
      }
    }
  }

  // Toggle sélection globale
  toggleSelectAll(): void {
    this.filles.forEach(fille => fille.selected = this.selectAll);
  }

  // Mettre à jour la sélection globale
  updateSelectAll(): void {
    this.selectAll = this.filles.length > 0 &&
      this.filles.every(fille => fille.selected);
  }

  private generateTempId(): string {
    return 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Compter les lignes sélectionnées
  getSelectedCount(): number {
    return this.filles.filter(fille => fille.selected).length;
  }

  hasSelection(): boolean {
    return this.getSelectedCount() > 0;
  }

  validateFormFille(): boolean {
    // Vérifier que toutes les lignes ont au moins un nom et une URL
    for (let i = 0; i < this.filles.length; i++) {
      const file = this.filles[i];
      if (!file.selected){
        continue; // Ignorer les lignes non sélectionnées
      }
      if (!file.idProduit || file.idProduit.trim() === '') {
        alert(`Veuillez choisir un produit à la ligne ${i + 1}`);
        return false;
      }

    }

    return true;
  }

  trackByFn(index: number, item: FilleModel): any {
    return item._id || index;
  }

  changePrixUnitaire(index: number): void {
    let idProduit = this.filles[index].idProduit;
    let produit = this.listProduit.find(p => p._id === idProduit);
    if (produit) {
      this.filles[index].prixUnitaire = produit.prix;
    } else {
      this.filles[index].prixUnitaire = 0;
    }
  }

  protected readonly alert = alert;

  @ViewChild('clientModal') clientModal!: ElementRef;
  onClientSubmit($event: ClientModel): void {
    console.log("🔥 J'AI REÇU LE CLIENT DE L'ENFANT:", $event);

    this.listClient.push($event);
    this.boxeForm.get("idClient")?.setValue($event._id);

    const modalElement = this.clientModal.nativeElement;
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }

    // Nettoyer le backdrop et la classe modal-open
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }
}
