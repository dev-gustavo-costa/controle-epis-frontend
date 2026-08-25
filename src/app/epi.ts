import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { EpiModel } from './epi.model';

@Service()
export class Epi {
  private http = inject(HttpClient); // Injetamos a depedencia.
  private apiUrl = 'http://localhost:8080/api/epis'; // Guarda o endereço da aplicação backend.

  // Sera o resposável pro retornar a lista para aqueles que tiverem conectados a esse service.
  listarTodos(): Observable<EpiModel[]> {
    return this.http.get<EpiModel[]>(this.apiUrl);
  }
  //Busca um iten na tabela atraves do nome(Ignorando acentos e Case).
  buscarPorNome(nome: string): Observable<EpiModel[]> {
    return this.http.get<EpiModel[]>(`${this.apiUrl}/buscar`, {
      params: { nome },
    });
  }
  // Resposavel por cadastrar um novo iten na tabela.
  /*---------------------------
    ---- Partial<EpiModel> ----

    Isso é um "tipo utilitário" do typscript que segnifica "todos os campos de EpiModel mas opcionais".
    Uso isso aqui porque, ao criar um EPI novo, você não vai mandar o ID (Ele é gerado pelo banco).
  ----------------------------- */
  criar(epi: Partial<EpiModel>): Observable<EpiModel> {
    return this.http.post<EpiModel>(this.apiUrl, epi);
  }
  atualizar(id: number, camposAlterados: Partial<EpiModel>): Observable<EpiModel> {
    return this.http.put<EpiModel>(`${this.apiUrl}/${id}`, camposAlterados);
  }
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
