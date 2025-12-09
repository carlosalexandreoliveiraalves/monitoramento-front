import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SideNavService } from '../services/draw/side-nav';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-side-nav',
  imports: [RouterLink],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css',
})
export class SideNav {
  protected sideNavService = inject(SideNavService);

  logout(): void {
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    window.sessionStorage.clear();
    window.location.href = "https://us-east-2hptvlua8w.auth.us-east-2.amazoncognito.com/logout?client_id=4tnlsfrldrl6mg67fualvd123d&logout_uri=http://localhost:4200";
  }
}
