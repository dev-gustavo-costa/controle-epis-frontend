import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; //Aqui importamos a biblioteca que nos permite conectar com o banco de dados + backend.
import { authInterceptor } from './auth-interceptor';
/*------------------------ 
  ----- provideHttpClient(...) -----

  Possibilita que a aplicação podera realizar requisições HTTP.

  ----- (withInterceptors([authInterceptor])) -----

  Isso registra o nosso interceptor para rodar em toda chamada HTTP da aplicação, automaticamente.
  ------------------------*/
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])), //Com isso essa aplicação vai poder fazer requisições HTTP
  ],
};
