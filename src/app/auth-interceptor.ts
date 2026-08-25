import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';

//Solicitar um explicação do HttpInterceptorFn para maior entedimento.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has('Authorization')) {
    return next(req);
  }

  const authService = inject(Auth);
  const credenciais = authService.getCredenciais();

  /*----------------------
    ----- req e next  -----

    req -> É requisição original (antes de sair).

    next -> É uma função que continua o fluxo, mandando a requisição apra frente (seja ela modificada ou não).

    ----- req.clone({...}) -----

    Requisições http no angular são imutaveis(não da para alterar diretamente), por isso fazemos uma cópia modificafa,
    adicionando o cabeçalho novo e é essa copia que enviamos.

    ----- Authorization: `Basic ${credenciais}` -----

    esse é o formato padão HTTP que o Stpring Security(do lado backend) epera par a auteticação Basic,
    é assim que ele indetifica e valida o usuário em cada requisição.
    ----------------------*/
  if (credenciais) {
    const reqComAuth = req.clone({
      setHeaders: {
        Authorization: `Basic ${credenciais}`,
      },
    });
    return next(reqComAuth);
  }

  return next(req);
};
