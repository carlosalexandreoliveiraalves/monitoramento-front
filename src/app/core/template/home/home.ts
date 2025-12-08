import { Component, inject } from '@angular/core';
import { SideNav } from "../side-nav/side-nav";
import { RouterOutlet } from '@angular/router';
import { Header } from "../header/header";
import { SideNavService } from '../services/draw/side-nav';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, SideNav, Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected sideNavService = inject(SideNavService);

}
