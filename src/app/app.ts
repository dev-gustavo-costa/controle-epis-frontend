import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepositoEpis } from './deposito-epis/deposito-epis';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('controle-epis');
}
