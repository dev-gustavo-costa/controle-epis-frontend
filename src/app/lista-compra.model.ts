import { EpiModel } from './epi.model';

export interface ItemListaCompraModel {
  id: number;
  epi: EpiModel;
  quantidadeOrcada: number;
  quantidadeRecebida: number | null;
}
export interface ListaCompraModel {
  id: number;
  dataCriacao: string;
  dataExpiracao: string;
  status: 'ABERTA' | 'APLICADA' | 'EXPIRADA';
  itens: ItemListaCompraModel[];
}
