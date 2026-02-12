import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ParkingSpot {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  description?: string;
  color: string;
  type: 'parking';
}

@Component({
  selector: 'app-parking-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parking-plan.component.html',
  styleUrl: './parking-plan.component.css',
})
export class ParkingPlanComponent implements AfterViewInit {
  @ViewChild('planCanvas') planCanvas!: ElementRef<HTMLDivElement>;

  spotes: ParkingSpot[] = [];
  selectedSpot: ParkingSpot | null = null;
  nextId = 1;
  gridSize = 20;
  showGrid = true;
  zoom = 1;
  planWidth = 1200;
  planHeight = 800;
  viewMode: 'plan' | 'table' = 'plan';
  editingSpot: Partial<ParkingSpot> | null = null;
  isEditMode = false;
  showModal = false;

  // Drag state
  isDragging = false;
  isResizing = false;
  dragOffsetX = 0;
  dragOffsetY = 0;
  resizeDirection = '';

  // Predefined spot types
spotTypes = [
    { type: 'parking' as const, name: 'Parking Spot', icon: 'M4 4h16v16H4V4z M9 8h4a3 3 0 0 1 0 6H9V8z M9 14v4', color: '#1A4A54', defaultWidth: 120, defaultHeight: 100 }
];

  ngAfterViewInit(): void {}

  // Drag from palette
  onDragStart(event: DragEvent, spotType: typeof this.spotTypes[0]): void {
    event.dataTransfer?.setData('spotType', JSON.stringify(spotType));
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
    const data = event.dataTransfer?.getData('spotType');
    if (data) {
      const spotType = JSON.parse(data);
      const rect = this.planCanvas.nativeElement.getBoundingClientRect();
      const x = this.snapToGrid((event.clientX - rect.left) / this.zoom - spotType.defaultWidth / 2);
      const y = this.snapToGrid((event.clientY - rect.top) / this.zoom - spotType.defaultHeight / 2);

      const newSpot: ParkingSpot = {
        id: this.nextId++,
        x: Math.max(0, x),
        y: Math.max(0, y),
        width: spotType.defaultWidth,
        height: spotType.defaultHeight,
        name: `${spotType.name} ${this.spotes.filter(b => b.type === spotType.type).length + 1}`,
        color: spotType.color,
        type: spotType.type,
      };
      this.spotes.push(newSpot);
      this.selectedSpot = newSpot;
    }
  }

  // Sélection au clic droit
  onSpotRightClick(event: MouseEvent, spot: ParkingSpot): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedSpot = this.selectedSpot?.id === spot.id ? null : spot;
  }

  // Move spot
  onSpotMouseDown(event: MouseEvent, spot: ParkingSpot): void {
    event.stopPropagation();
    event.preventDefault();
    this.isDragging = true;

    const rect = this.planCanvas.nativeElement.getBoundingClientRect();
    this.dragOffsetX = (event.clientX - rect.left) / this.zoom - spot.x;
    this.dragOffsetY = (event.clientY - rect.top) / this.zoom - spot.y;

    const onMouseMove = (e: MouseEvent) => {
      if (!this.isDragging) return;
      const r = this.planCanvas.nativeElement.getBoundingClientRect();
      spot.x = this.snapToGrid((e.clientX - r.left) / this.zoom - this.dragOffsetX);
      spot.y = this.snapToGrid((e.clientY - r.top) / this.zoom - this.dragOffsetY);
      spot.x = Math.max(0, spot.x);
      spot.y = Math.max(0, spot.y);
    };

    const onMouseUp = () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // Resize spot
  onResizeMouseDown(event: MouseEvent, spot: ParkingSpot, direction: string): void {
    event.stopPropagation();
    event.preventDefault();
    this.isResizing = true;
    this.resizeDirection = direction;

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = spot.width;
    const startHeight = spot.height;
    const startSpotX = spot.x;
    const startSpotY = spot.y;

    const onMouseMove = (e: MouseEvent) => {
      if (!this.isResizing) return;
      const dx = (e.clientX - startX) / this.zoom;
      const dy = (e.clientY - startY) / this.zoom;

      if (direction.includes('e')) {
        spot.width = this.snapToGrid(Math.max(40, startWidth + dx));
      }
      if (direction.includes('s')) {
        spot.height = this.snapToGrid(Math.max(40, startHeight + dy));
      }
      if (direction.includes('w')) {
        const newWidth = Math.max(40, startWidth - dx);
        spot.x = this.snapToGrid(startSpotX + startWidth - newWidth);
        spot.width = this.snapToGrid(newWidth);
      }
      if (direction.includes('n')) {
        const newHeight = Math.max(40, startHeight - dy);
        spot.y = this.snapToGrid(startSpotY + startHeight - newHeight);
        spot.height = this.snapToGrid(newHeight);
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
    this.selectedSpot = null;
  }

  deleteSpot(spot: ParkingSpot): void {
    this.spotes = this.spotes.filter(b => b.id !== spot.id);
    if (this.selectedSpot?.id === spot.id) {
      this.selectedSpot = null;
    }
  }

  deleteSelected(): void {
    if (this.selectedSpot) {
      this.deleteSpot(this.selectedSpot);
    }
  }

  validateSpot(): void {
    if (this.selectedSpot) {
      const spotData = {
        id: this.selectedSpot.id,
        name: this.selectedSpot.name,
        description: this.selectedSpot.description || '',
        type: this.selectedSpot.type,
        x: this.selectedSpot.x,
        y: this.selectedSpot.y,
        width: this.selectedSpot.width,
        height: this.selectedSpot.height,
        color: this.selectedSpot.color,
      };
      console.log('Spot validé :', spotData);
      this.selectedSpot = null;
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

  getSpotTypeIcon(type: string): string {
    return this.spotTypes.find(bt => bt.type === type)?.icon || '';
  }

  // View mode
  switchViewMode(mode: 'plan' | 'table'): void {
    this.viewMode = mode;
    this.selectedSpot = null;
    this.editingSpot = null;
    this.isEditMode = false;
    this.showModal = false;
  }

  // Table mode methods
  startNewSpot(): void {
    this.editingSpot = {
      id: 0,
      x: 0,
      y: 0,
      width: 120,
      height: 100,
      name: '',
      description: '',
      color: '#1A4A54',
      type: 'parking'
    };
    this.isEditMode = false;
    this.showModal = true;
  }

  editSpotFromTable(spot: ParkingSpot): void {
    this.editingSpot = { ...spot };
    this.isEditMode = true;
    this.showModal = true;
  }

  saveSpotFromTable(): void {
    if (!this.editingSpot || !this.editingSpot.name) return;

    if (this.isEditMode && this.editingSpot.id) {
      const index = this.spotes.findIndex(s => s.id === this.editingSpot!.id);
      if (index !== -1) {
        this.spotes[index] = this.editingSpot as ParkingSpot;
      }
    } else {
      const newSpot: ParkingSpot = {
        ...this.editingSpot as ParkingSpot,
        id: this.nextId++
      };
      this.spotes.push(newSpot);
    }

    this.editingSpot = null;
    this.isEditMode = false;
    this.showModal = false;
  }

  cancelEdit(): void {
    this.editingSpot = null;
    this.isEditMode = false;
    this.showModal = false;
  }

  deleteSpotFromTable(spot: ParkingSpot): void {
    this.spotes = this.spotes.filter(s => s.id !== spot.id);
  }
}
