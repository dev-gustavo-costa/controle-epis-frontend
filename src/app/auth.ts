import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Service()
export class Auth {
  private http = inject(HttpClient);

  private credenciais = signal<string | null>(localStorage.getItem('credenciais')); // Credenciais só pode receber uma string ou null.

  // Esse é o valor que o guard consulta para decidir se libera o acesso ou redireciona para o login.
  // Por ser um signal, o guard reage automaticamente sempre que ele mudar.
  logado = signal(!!localStorage.getItem('credenciais'));

  /* ------------------------------
    ----- Observable<boolean> -----

    Ele testa, fazendo uma chamada real pro backend com as credencias digitais, antes de decidir se guarda ou não.

    ----- btoa -----

    É uma função nativa do navegador (não do Angular) que transforma texto em base64.

    Importante: Base64 não é criptografia - é so codificação, que pode ser revertido por qualquer um,
    ainda sera realizado no futuro a implemetação de uma criptografia adequada.
    
    ----- .pipe(map(...), catchError(...)) -----

    São operadores do RxJS(A biblioteca por tras dos Observables) que transformam o resultados:
    
    Se a chamada funcionar (map), significa que a senha estava certa, aí sim guardamos e retornamos true.
    
    Se a chamada falhar (catchErro), retornamos false, sem guardar nada.
     ------------------------------ */
  login(usuario: string, senha: string): Observable<boolean> {
    const token = btoa(`${usuario}:${senha}`);

    return this.http
      .get('http://localhost:8080/api/epis', {
        headers: { Authorization: ` Basic ${token}` },
      })
      .pipe(
        map(() => {
          localStorage.setItem('credenciais', token);
          this.credenciais.set(token);
          this.logado.set(true);
          return true;
        }),
        catchError(() => of(false)),
      );
  }

  logout(): void {
    localStorage.removeItem('credenciais');
    this.credenciais.set(null);
    this.logado.set(false);
  }

  getCredenciais(): string | null {
    return this.credenciais();
  }
}
