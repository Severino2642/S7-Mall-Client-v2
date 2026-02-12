import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar.component/sidebar.component';
import { ParkingPlanComponent } from '../parking-plan.component/parking-plan.component';

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [SidebarComponent, ParkingPlanComponent],
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
})
export class ParkingComponent {

}
