import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

// CanActivateFn -> Roda antes de qualquer roda protegida ser carreda, impossibilitando acesso sem o login.
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.logado()) {
    // Se verdadeiro libera acesso
    return true;
  }
  router.navigate(['/login']); // Se não for verdadeiro, sera executado esse direcionamento pro login.
  return false;
};
