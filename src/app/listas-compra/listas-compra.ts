import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ListaCompra } from '../lista-compra';
import { ListaCompraModel } from '../lista-compra.model';
import { RouterLink } from '@angular/router';
import { EpiModel } from '../epi.model';
import { FormsModule } from '@angular/forms';
import { Epi } from '../epi';

interface ItemParaCriar {
  epi: EpiModel;
  quantidadeOrcada: number;
}

@Component({
  selector: 'app-listas-compra',
  imports: [RouterLink, FormsModule],
  templateUrl: './listas-compra.html',
  styleUrl: './listas-compra.css',
})
export class ListasCompra implements OnInit {
  private listaCompraService = inject(ListaCompra);
  private epiService = inject(Epi);

  listas = signal<ListaCompraModel[]>([]);
  modalCriarAberto = signal(false);
  itensParaCriar = signal<ItemParaCriar[]>([]);
  todosEpis = signal<EpiModel[]>([]);
  epiSelecionadoId: number | null = null;
  // Propriedades para acessar detalhes lista.
  modalDetalheAberto = signal(false);
  listaSelecionada = signal<ListaCompraModel | null>(null);
  quantidadesRecebidas: Record<number, number> = {};

  // Recalcula sozinho sempre que "todosEpis" ou "itensParaCriar" mudar.
  episDisponiveis = computed(() =>
    this.todosEpis().filter((epi) => !this.itensParaCriar().some((item) => item.epi.id === epi.id)),
  );

  ngOnInit(): void {
    this.carregarListas();
  }

  carregarListas(): void {
    this.listaCompraService.listarTodos().subscribe((dados: ListaCompraModel[]) => {
      this.listas.set(dados);
    });
  }

  abrirModalCriar(): void {
    this.listaCompraService.sugestao().subscribe((epis: EpiModel[]) => {
      this.itensParaCriar.set(epis.map((epi) => ({ epi, quantidadeOrcada: 0 })));
      this.modalCriarAberto.set(true);
    });
    this.epiService.listarTodos().subscribe((epis: EpiModel[]) => {
      this.todosEpis.set(epis);
    });
  }

  fecharModalCriar(): void {
    this.modalCriarAberto.set(false);
    this.itensParaCriar.set([]);
    this.epiSelecionadoId = null;
  }

  adicionarEpiManual(): void {
    if (this.epiSelecionadoId === null) {
      return;
    }

    const epi = this.todosEpis().find((e) => e.id === this.epiSelecionadoId);
    if (!epi) {
      return;
    }

    this.itensParaCriar.update((itens) => [...itens, { epi, quantidadeOrcada: 0 }]);
    this.epiSelecionadoId = null;
  }

  removerItem(index: number): void {
    this.itensParaCriar.update((itens) => itens.filter((_, i) => i !== index));
  }

  salvarLista(): void {
    const itens = this.itensParaCriar()
      .filter((item) => item.quantidadeOrcada > 0)
      .map((item) => ({
        epi: { id: item.epi.id },
        quantidadeOrcada: item.quantidadeOrcada,
      }));

    if (itens.length === 0) {
      return;
    }

    this.listaCompraService.criar(itens).subscribe(() => {
      this.fecharModalCriar();
      this.carregarListas();
    });
  }

  // Métodos para detalhes das listas:
  abrirModalDetalhe(lista: ListaCompraModel): void {
    this.listaCompraService.buscarPorId(lista.id).subscribe((dados) => {
      this.listaSelecionada.set(dados);
      this.quantidadesRecebidas = {};
      dados.itens.forEach((item) => {
        this.quantidadesRecebidas[item.id] = item.quantidadeOrcada;
      });
      this.modalDetalheAberto.set(true);
    });
  }

  fecharModalDetalhe(): void {
    this.modalDetalheAberto.set(false);
    this.listaSelecionada.set(null);
    this.quantidadesRecebidas = {};
  }

  baixarPdf(id: number): void {
    this.listaCompraService.baixarPDF(id).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `lista-compra-${id}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  aplicarLista(): void {
    const lista = this.listaSelecionada();
    if (!lista) {
      return;
    }

    const itensRecebidos = lista.itens.map((item) => ({
      itemId: item.id,
      quantidadeRecebida: this.quantidadesRecebidas[item.id] ?? 0,
    }));

    this.listaCompraService.aplicar(lista.id, itensRecebidos).subscribe(() => {
      this.fecharModalDetalhe();
      this.carregarListas();
    });
  }
}
