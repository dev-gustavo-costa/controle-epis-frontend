import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';

// HttpInterceptorFn intercepta toda requisição HTTP antes dela sair da aplicação, permitindo
// inspecionar ou modificar a requisição (como adicionar o header de autenticação abaixo).
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

    Requisições HTTP no Angular são imutáveis (não dá para alterar diretamente), por isso fazemos uma cópia modificada,
    adicionando o cabeçalho novo, e é essa cópia que enviamos.

    ----- Authorization: `Basic ${credenciais}` -----

    Esse é o formato padrão HTTP que o Spring Security (do lado do backend) espera para a autenticação Basic;
    é assim que ele identifica e valida o usuário em cada requisição.
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
