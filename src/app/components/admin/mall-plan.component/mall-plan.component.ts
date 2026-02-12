import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MallBox {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  description?: string;
  color: string;
  type: 'box';
}

@Component({
  selector: 'app-mall-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mall-plan.component.html',
  styleUrl: './mall-plan.component.css',
})
export class MallPlanComponent implements AfterViewInit {
  @ViewChild('planCanvas') planCanvas!: ElementRef<HTMLDivElement>;

  boxes: MallBox[] = [];
  selectedBox: MallBox | null = null;
  nextId = 1;
  gridSize = 20;
  showGrid = true;
  zoom = 1;
  planWidth = 1200;
  planHeight = 800;
  viewMode: 'plan' | 'table' = 'plan';
  editingBox: Partial<MallBox> | null = null;
  isEditMode = false;
  showModal = false;

  // Drag state
  isDragging = false;
  isResizing = false;
  dragOffsetX = 0;
  dragOffsetY = 0;
  resizeDirection = '';

  // Predefined box types
boxTypes = [
    { type: 'box' as const, name: 'Box', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', color: '#1A4A54', defaultWidth: 120, defaultHeight: 100 }
];

  ngAfterViewInit(): void {}

  // Drag from palette
  onDragStart(event: DragEvent, boxType: typeof this.boxTypes[0]): void {
    event.dataTransfer?.setData('boxType', JSON.stringify(boxType));
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'copy';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const data = event.dataTransfer?.getData('boxType');
    if (data) {
      const boxType = JSON.parse(data);
      const rect = this.planCanvas.nativeElement.getBoundingClientRect();
      const x = this.snapToGrid((event.clientX - rect.left) / this.zoom - boxType.defaultWidth / 2);
      const y = this.snapToGrid((event.clientY - rect.top) / this.zoom - boxType.defaultHeight / 2);

      const newBox: MallBox = {
        id: this.nextId++,
        x: Math.max(0, x),
        y: Math.max(0, y),
        width: boxType.defaultWidth,
        height: boxType.defaultHeight,
        name: `${boxType.name} ${this.boxes.filter(b => b.type === boxType.type).length + 1}`,
        color: boxType.color,
        type: boxType.type,
      };
      this.boxes.push(newBox);
      this.selectedBox = newBox;
    }
  }

  // Sélection au clic droit
  onBoxRightClick(event: MouseEvent, box: MallBox): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedBox = this.selectedBox?.id === box.id ? null : box;
  }

  // Move box
  onBoxMouseDown(event: MouseEvent, box: MallBox): void {
    event.stopPropagation();
    event.preventDefault();
    this.isDragging = true;

    const rect = this.planCanvas.nativeElement.getBoundingClientRect();
    this.dragOffsetX = (event.clientX - rect.left) / this.zoom - box.x;
    this.dragOffsetY = (event.clientY - rect.top) / this.zoom - box.y;

    const onMouseMove = (e: MouseEvent) => {
      if (!this.isDragging) return;
      const r = this.planCanvas.nativeElement.getBoundingClientRect();
      box.x = this.snapToGrid((e.clientX - r.left) / this.zoom - this.dragOffsetX);
      box.y = this.snapToGrid((e.clientY - r.top) / this.zoom - this.dragOffsetY);
      box.x = Math.max(0, box.x);
      box.y = Math.max(0, box.y);
    };

    const onMouseUp = () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // Resize box
  onResizeMouseDown(event: MouseEvent, box: MallBox, direction: string): void {
    event.stopPropagation();
    event.preventDefault();
    this.isResizing = true;
    this.resizeDirection = direction;

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = box.width;
    const startHeight = box.height;
    const startBoxX = box.x;
    const startBoxY = box.y;

    const onMouseMove = (e: MouseEvent) => {
      if (!this.isResizing) return;
      const dx = (e.clientX - startX) / this.zoom;
      const dy = (e.clientY - startY) / this.zoom;

      if (direction.includes('e')) {
        box.width = this.snapToGrid(Math.max(40, startWidth + dx));
      }
      if (direction.includes('s')) {
        box.height = this.snapToGrid(Math.max(40, startHeight + dy));
      }
      if (direction.includes('w')) {
        const newWidth = Math.max(40, startWidth - dx);
        box.x = this.snapToGrid(startBoxX + startWidth - newWidth);
        box.width = this.snapToGrid(newWidth);
      }
      if (direction.includes('n')) {
        const newHeight = Math.max(40, startHeight - dy);
        box.y = this.snapToGrid(startBoxY + startHeight - newHeight);
        box.height = this.snapToGrid(newHeight);
      }
    };

    const onMouseUp = () => {
      this.isResizing = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  onPlanClick(): void {
    this.selectedBox = null;
  }

  deleteBox(box: MallBox): void {
    this.boxes = this.boxes.filter(b => b.id !== box.id);
    if (this.selectedBox?.id === box.id) {
      this.selectedBox = null;
    }
  }

  deleteSelected(): void {
    if (this.selectedBox) {
      this.deleteBox(this.selectedBox);
    }
  }

  validateBox(): void {
    if (this.selectedBox) {
      const boxData = {
        id: this.selectedBox.id,
        name: this.selectedBox.name,
        description: this.selectedBox.description || '',
        type: this.selectedBox.type,
        x: this.selectedBox.x,
        y: this.selectedBox.y,
        width: this.selectedBox.width,
        height: this.selectedBox.height,
        color: this.selectedBox.color,
      };
      console.log('Box validé :', boxData);
      this.selectedBox = null;
    }
  }

  snapToGrid(value: number): number {
    if (!this.showGrid) return Math.round(value);
    return Math.round(value / this.gridSize) * this.gridSize;
  }

  zoomIn(): void {
    this.zoom = Math.min(2, this.zoom + 0.1);
  }

  zoomOut(): void {
    this.zoom = Math.max(0.3, this.zoom - 0.1);
  }

  resetZoom(): void {
    this.zoom = 1;
  }

  getBoxTypeIcon(type: string): string {
    return this.boxTypes.find(bt => bt.type === type)?.icon || '';
  }

  // Table mode methods
  switchViewMode(mode: 'plan' | 'table'): void {
    this.viewMode = mode;
    this.selectedBox = null;
    this.editingBox = null;
  }

  startNewBox(): void {
    this.editingBox = {
      name: '',
      description: '',
      type: 'box',
      x: 0,
      y: 0,
      width: 120,
      height: 100,
      color: '#1A4A54',
    };
    this.isEditMode = false;
    this.showModal = true;
  }

  editBoxFromTable(box: MallBox): void {
    this.editingBox = { ...box };
    this.isEditMode = true;
    this.showModal = true;
  }

  saveBoxFromTable(): void {
    if (!this.editingBox || !this.editingBox.name) {
      alert('Le nom est obligatoire');
      return;
    }

    if (this.isEditMode && this.editingBox.id) {
      const index = this.boxes.findIndex(b => b.id === this.editingBox!.id);
      if (index !== -1) {
        this.boxes[index] = this.editingBox as MallBox;
        console.log('Box modifié :', this.editingBox);
      }
    } else {
      const newBox: MallBox = {
        id: this.nextId++,
        name: this.editingBox.name,
        description: this.editingBox.description || '',
        type: this.editingBox.type || 'box',
        x: this.editingBox.x || 0,
        y: this.editingBox.y || 0,
        width: this.editingBox.width || 120,
        height: this.editingBox.height || 100,
        color: this.editingBox.color || '#1A4A54',
      };
      this.boxes.push(newBox);
      console.log('Nouveau box ajouté :', newBox);
    }

    this.editingBox = null;
    this.isEditMode = false;
    this.showModal = false;
  }

  cancelEdit(): void {
    this.editingBox = null;
    this.isEditMode = false;
    this.showModal = false;
  }

  deleteBoxFromTable(box: MallBox): void {
    if (confirm(`Supprimer "${box.name}" ?`)) {
      this.deleteBox(box);
    }
  }
}
