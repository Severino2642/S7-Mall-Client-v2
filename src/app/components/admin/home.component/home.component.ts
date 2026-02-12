import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar.component/sidebar.component';
import { MallPlanComponent } from '../mall-plan.component/mall-plan.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, MallPlanComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
