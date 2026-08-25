import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { EpiModel } from './epi.model';
import { ListaCompraModel } from './lista-compra.model';

@Service()
export class ListaCompra {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/listas-compra';

  sugestao(): Observable<EpiModel[]> {
    return this.http.get<EpiModel[]>(`${this.apiUrl}/sugestao`);
  }

  criar(itens: { epi: { id: number }; quantidadeOrcada: number }[]): Observable<ListaCompraModel> {
    return this.http.post<ListaCompraModel>(this.apiUrl, itens);
  }

  listarTodos(): Observable<ListaCompraModel[]> {
    return this.http.get<ListaCompraModel[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<ListaCompraModel> {
    return this.http.get<ListaCompraModel>(`${this.apiUrl}/${id}`);
  }

  aplicar(
    id: number,
    itensRecebidos: { itemId: number; quantidadeRecebida: number }[],
  ): Observable<ListaCompraModel> {
    return this.http.post<ListaCompraModel>(`${this.apiUrl}/${id}/aplicar`, itensRecebidos);
  }

  // responseType: 'blob' avisa o Angular que a resposta não é um JSON, e sim um arquivo binário (o PDF).
  baixarPDF(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, { responseType: 'blob' });
  }
}
