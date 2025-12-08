import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SideNavService } from '../services/draw/side-nav';

@Component({
  selector: 'app-side-nav',
  imports: [RouterLink],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css',
})
export class SideNav {
  protected sideNavService = inject(SideNavService);

  
}
