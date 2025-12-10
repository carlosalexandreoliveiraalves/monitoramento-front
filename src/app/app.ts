import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('front-monitoramento-agua');

  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  userData$ = this.oidcSecurityService.userData$;
  isAuthenticated = false;

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {

      console.log('=== VERIFICAÇÃO DE AUTENTICAÇÃO ===');
      console.log('Está autenticado?', isAuthenticated);
      console.log('Dados do usuário:', userData);
      console.log('Access Token:', accessToken);
      console.log('ID Token:', idToken);

      this.isAuthenticated = isAuthenticated;


    });
  }
}
