import { Component } from '@angular/core';
import { SideNav } from "../side-nav/side-nav";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, SideNav],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
