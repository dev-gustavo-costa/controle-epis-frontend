export interface EpiModel {
  // Vantagem que padroniza o formato em todo o codigo, e ajuda a evitar erros.
  id: number;
  epi: number;
  nomeEpi: string;
  ca: number;
  estoque: number;
  estoqueMin: number;
  mediaGasta: number;
}
