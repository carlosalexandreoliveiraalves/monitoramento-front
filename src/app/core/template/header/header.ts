import { SideNavService } from './../services/draw/side-nav';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private sideNavService = inject(SideNavService);

  toggleSideNav() {
    this.sideNavService.toogleSideNav();
  }


}
