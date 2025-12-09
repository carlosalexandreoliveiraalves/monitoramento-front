import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {

  private readonly oidcSecurityService = inject(OidcSecurityService);

  login(): void {
    this.oidcSecurityService.authorize();
  }
}
