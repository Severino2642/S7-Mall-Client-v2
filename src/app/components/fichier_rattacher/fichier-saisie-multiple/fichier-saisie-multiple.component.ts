import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "../../admin/navbar.component/navbar.component";
import {HeaderComponent} from "../../admin/header.component/header.component";
import {FileModel} from "../../../models/file.model";
import {FileService} from "../../../services/file.service/file.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ImagekitService} from "../../../services/imagekit.service/imagekit.service";
import {FileTypeService} from "../../../services/file-type.service/file-type.service";
import {FileTypeModel} from "../../../models/file-type.model";

export interface FilleModel extends FileModel {
  selectedFile?: File;
  selected?: boolean;
}

@Component({
  selector: 'app-fichier-saisie-multiple',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, HeaderComponent],
  templateUrl: './fichier-saisie-multiple.component.html',
  styleUrl: './fichier-saisie-multiple.component.css'
})
export class FichierSaisieMultipleComponent {
  isLoading = false;
  @Input() initialFiles: FilleModel[] = [];
  @Input() fileTypes: FileTypeModel[] = [];
  @Input() idProprietaire?: string;
  @Input() backLink?: string = '/';
  @Output() onSubmit = new EventEmitter<FilleModel[]>();
  @Output() onCancel = new EventEmitter<void>();

  files: FilleModel[] = [];
  selectAll = false;

  constructor(
    private fileService: FileService,
    private router : Router,
    private route: ActivatedRoute,
    private imagekitService : ImagekitService,
    private fileTypeService : FileTypeService
  ) {}

  async ngOnInit(): Promise<void> {
    // Types par défaut si non fournis
    const id = this.route.snapshot.params['idProprietaire'];
    this.backLink = this.route.snapshot.queryParams['backlink'] || '/admin/boxe';
    this.idProprietaire = id;
    await this.loadFileTypes();
    // Charger les fichiers initiaux ou ajouter une ligne vide
    if (this.initialFiles && this.initialFiles.length > 0) {
      this.files = this.initialFiles.map(f => ({ ...f, selected: false }));
    } else {
      this.addRow();
    }
  }

  async loadFileTypes(): Promise<void> {
    let res = await this.fileTypeService.getAll();
    if (res) {
      this.fileTypes = res;
    }
  }

  onFileSelected(index:any,event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Type de fichier non supporté (JPG, PNG, GIF, WebP uniquement)');
        event.target.value = '';
        return;
      }
      this.files[index].selectedFile = file;
    }
  }

  // Ajouter une nouvelle ligne
  addRow(): void {
    const newFile: FilleModel = {
      _id: this.generateTempId(),
      nom: '',
      url: '',
      idType: this.fileTypes[0]._id,
      idProprietaire: this.idProprietaire,
      selected: false
    };
    this.files.push(newFile);
  }

  // Supprimer une ligne spécifique
  deleteRow(index: number): void {
    this.files.splice(index, 1);
    this.updateSelectAll();

    // Ajouter une ligne vide si le tableau est vide
    if (this.files.length === 0) {
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
      this.files = this.files.filter(file => !file.selected);
      this.selectAll = false;

      // Ajouter une ligne vide si le tableau est vide
      if (this.files.length === 0) {
        this.addRow();
      }
    }
  }

  // Toggle sélection globale
  toggleSelectAll(): void {
    this.files.forEach(file => file.selected = this.selectAll);
  }

  // Mettre à jour la sélection globale
  updateSelectAll(): void {
    this.selectAll = this.files.length > 0 &&
      this.files.every(file => file.selected);
  }

  // Compter les lignes sélectionnées
  getSelectedCount(): number {
    return this.files.filter(file => file.selected).length;
  }

  // Vérifier si des lignes sont sélectionnées
  hasSelection(): boolean {
    return this.getSelectedCount() > 0;
  }

  // Valider le formulaire
  validateForm(): boolean {
    // Vérifier que toutes les lignes ont au moins un nom et une URL
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];

      if (!file.nom || file.nom.trim() === '') {
        alert(`Veuillez remplir le nom du fichier à la ligne ${i + 1}`);
        return false;
      }

      if (!file.url || file.url.trim() === '') {
        alert(`Veuillez remplir l'URL du fichier à la ligne ${i + 1}`);
        return false;
      }
    }

    return true;
  }

  // Soumettre le formulaire
  async submitForm(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    try {
      // 1. Filtrer les fichiers à uploader (avec selectedFile)
      const filesToUpload = this.files.filter(file => file.selectedFile);

      // 2. Upload en parallèle (BEAUCOUP PLUS RAPIDE)
      if (filesToUpload.length > 0) {
        console.log(`📤 Upload de ${filesToUpload.length} fichier(s) en parallèle...`);

        const uploadPromises = filesToUpload.map(async (file) => {
          try {
            const imageUrl = await this.imagekitService.uploadImage(
              file.selectedFile,
              `/${this.idProprietaire}`
            );
            return { ...file, url: imageUrl };
          } catch (error) {
            console.error(`❌ Échec upload ${file.nom}:`, error);
            throw new Error(`Échec upload: ${file.nom}`);
          }
        });

        // Attendre que TOUS les uploads soient terminés
        const uploadedFiles = await Promise.all(uploadPromises);

        // Mettre à jour les fichiers originaux avec les URLs
        uploadedFiles.forEach(uploadedFile => {
          const index = this.files.findIndex(f => f.nom === uploadedFile.nom);
          if (index !== -1) {
            this.files[index].url = uploadedFile.url;
          }
        });
      }

      // 3. Préparer les données pour l'insertion multiple
      const cleanedFiles = this.files.map(file => {
        const { _id,date,selectedFile, selected, ...cleanFile } = file;
        return {
          ...cleanFile,
          idProprietaire: this.idProprietaire
        };
      });

      // 4. Insérer en base
      console.log('💾 Insertion en base...');
      const result = await this.fileService.createMultiple(cleanedFiles);

      if (result) {
        console.log('✅ Succès:', result);
        alert(`${cleanedFiles.length} fichier(s) enregistré(s) avec succès`);
        this.router.navigate([this.backLink,this.idProprietaire]);
      }

    } catch (error: any) {
      console.error('❌ Erreur:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Annuler
  cancel(): void {
    this.onCancel.emit();
  }

  // Générer un ID temporaire
  private generateTempId(): string {
    return 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Track by pour performance
  trackByFn(index: number, item: FilleModel): any {
    return item._id || index;
  }

}
