import { Component } from '@angular/core';
import { SideNav } from "../side-nav/side-nav";
import { RouterOutlet } from '@angular/router';
import { Header } from "../header/header";

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, SideNav, Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
