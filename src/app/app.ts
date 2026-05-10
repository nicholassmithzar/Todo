import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { Navbar } from "./components/navbar/navbar";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class  App implements OnInit  {
  protected readonly title = signal('Todo Management');
      constructor(private primeng: PrimeNG) {}

    ngOnInit() {
        this.primeng.ripple.set(true);
    }
}
