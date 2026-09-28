import { Component, inject, signal } from '@angular/core';
import { Auth } from '../auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router);

  usuario = '';
  senha = '';
  erro = signal(false);

  entrar(): void {
    this.authService.login(this.usuario, this.senha).subscribe((sucesso) => {
      if (sucesso) {
        this.router.navigate(['/epis']);
      } else {
        this.erro.set(true);
      }
    });
  }
}
