import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { EpiModel } from './epi.model';

@Service()
export class Epi {
  private http = inject(HttpClient); // Injetamos a dependência do HttpClient via inject().
  private apiUrl = 'http://localhost:8080/api/epis'; // Guarda o endereço da aplicação backend.

  // Responsável por retornar a lista de EPIs para quem estiver inscrito neste observable.
  listarTodos(): Observable<EpiModel[]> {
    return this.http.get<EpiModel[]>(this.apiUrl);
  }
  // Busca um item na tabela pelo nome (ignorando acentos e maiúsculas/minúsculas).
  buscarPorNome(nome: string): Observable<EpiModel[]> {
    return this.http.get<EpiModel[]>(`${this.apiUrl}/buscar`, {
      params: { nome },
    });
  }
  // Responsável por cadastrar um novo item na tabela.
  /*---------------------------
    ---- Partial<EpiModel> ----

    Isso é um "tipo utilitário" do TypeScript que significa "todos os campos de EpiModel, porém opcionais".
    Uso isso aqui porque, ao criar um EPI novo, você não vai enviar o ID (ele é gerado pelo banco).
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
