import { Component, inject, OnInit, signal } from '@angular/core';
import { Epi } from '../epi';
import { EpiModel } from '../epi.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-deposito-epis',
  imports: [FormsModule, RouterLink],
  templateUrl: './deposito-epis.html',
  styleUrl: './deposito-epis.css',
})
export class DepositoEpis implements OnInit {
  private epiService = inject(Epi); // Pega a instância pronta do Service Epi, injetada pelo Angular.
  private authService = inject(Auth);
  private router = inject(Router);

  epis = signal<EpiModel[]>([]);
  modalAberto = signal(false);
  modoEdicao = signal(false);
  termoBusca = '';

  /*
  ---- Partial ----

  Tipamos novoEpi como Partial<EpiModel> porque o objeto começa vazio (sem todos os campos)
  até o usuário preencher o formulário de cadastro/edição.
  */
  novoEpi: Partial<EpiModel> = {};
  private epiOriginal: EpiModel | null = null;

  // Chama o listar todos no momento que abrir a pagina HTML.
  ngOnInit(): void {
    this.carregarEpi();
  }
  // Método para listar todos os dados da tabela na tela.
  carregarEpi(): void {
    this.epiService.listarTodos().subscribe((dados: EpiModel[]) => {
      this.epis.set(dados);
    }); // É literalmente se inscrever (subscribe) para receber o resultado quando ele chegar.
  }

  // Método para buscar um dado específico da tabela pelo nome.
  buscar(): void {
    if (this.termoBusca.trim() === '') {
      this.carregarEpi();
      return;
    }

    this.epiService.buscarPorNome(this.termoBusca).subscribe((dados: EpiModel[]) => {
      this.epis.set(dados);
    });
  }

  abrirModalCadastro(): void {
    this.modoEdicao.set(false);
    this.novoEpi = {};
    this.epiOriginal = null;
    this.modalAberto.set(true);
  }
  abrirModalEdicao(epi: EpiModel): void {
    this.modoEdicao.set(true);
    this.epiOriginal = epi;
    this.novoEpi = { ...epi };
    this.modalAberto.set(true);
  }
  fecharModal(): void {
    this.modalAberto.set(false);
    this.novoEpi = {};
    this.epiOriginal = null;
  }
  salvar(): void {
    if (this.modoEdicao() && this.epiOriginal) {
      const camposAlterados = this.calcularDiferenca(this.epiOriginal, this.novoEpi);

      if (Object.keys(camposAlterados).length === 0) {
        this.fecharModal();
        return;
      }

      this.epiService.atualizar(this.epiOriginal.id, camposAlterados).subscribe(() => {
        this.fecharModal();
        this.carregarEpi();
      });
    } else {
      this.epiService.criar(this.novoEpi).subscribe(() => {
        this.fecharModal();
        this.carregarEpi();
      });
    }
  }

  calcularDiferenca(original: EpiModel, novo: Partial<EpiModel>): Partial<EpiModel> {
    const difereca: Partial<EpiModel> = {};

    (Object.keys(novo) as (keyof EpiModel)[]).forEach((campo) => {
      if (novo[campo] !== original[campo]) {
        (difereca as any)[campo] = novo[campo];
      }
    });

    return difereca;
  }

  confirmarExclusao(epi: EpiModel): void {
    const confirmado = confirm(`Tem certeza que deseja excluir "${epi.nomeEpi}"?`);
    if (confirmado) {
      this.epiService.deletar(epi.id).subscribe(() => {
        this.carregarEpi();
      });
    }
  }

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
