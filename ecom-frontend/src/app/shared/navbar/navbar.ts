import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],   // needed for routing links
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {}
