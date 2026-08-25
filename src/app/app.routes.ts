import { Routes } from '@angular/router';
import { Login } from './login/login';
import { DepositoEpis } from './deposito-epis/deposito-epis';
import { authGuard } from './auth-guard';
import { ListasCompra } from './listas-compra/listas-compra';

/*-----------------------
  ----- canActivate: [authGuard] -----

  Com esse comando nos garantimos que para acessar a página epis, primeiro deve ser aprovado pelo authGuard,
  após a realização do login e sem que possa ser burlado digitando direto na URL do navegador epis.
  -----------------------
*/
export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'epis', component: DepositoEpis, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'listas-compra', component: ListasCompra, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' },
];
