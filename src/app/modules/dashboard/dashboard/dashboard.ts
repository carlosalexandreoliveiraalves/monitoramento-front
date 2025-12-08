import { Component } from '@angular/core';
import { ChartLastHours } from "../components/chart-last-hours/chart-last-hours";

@Component({
  selector: 'app-dashboard',
  imports: [ChartLastHours],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
