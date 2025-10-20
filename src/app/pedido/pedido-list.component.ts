import { CaminhoMenuComponent } from '../caminho-menu/caminho-menu.component';
import { Carrinho } from '../carrinho/carrinho';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Entrega } from '../entrega/entrega';
import { EntregaService } from '../entrega/entrega.service';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { Pedido } from './pedido';
import { PedidoService } from './pedido.service';
import { Produto } from './../produto/produto';
import { Router, RouterLink } from '@angular/router';
import { StarComponent } from '../star/star.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  templateUrl: './pedido-list.component.html',
  styleUrl: './pedido-list.component.css',
  imports: [
    CaminhoMenuComponent,
    CommonModule,
    FormsModule,
    //RouterLink,
    StarComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class PedidoListComponent implements OnInit {
  private updateSubscription!: Subscription;

  message: string = '';
  modulo: string = '';
  local: string = '';
  telefone: number = 0;
  login: boolean = false;
  // tslint:disable-next-line:variable-name
  _categoryId: string = '';

  displayStyle: string = '';

  filteredPedidos: Pedido[] = [];
  pedidos: Pedido[] = [];

  // tslint:disable-next-line:variable-name
  entrega = {} as Entrega;

  // tslint:disable-next-line:variable-name
  produto = {} as Produto;

  carrinho = {} as Carrinho;

  // tslint:disable-next-line:variable-name
  pedido = {} as Pedido;

  // tslint:disable-next-line:variable-name
  _pedidos: Pedido[] = [];

  // tslint:disable-next-line:variable-name
  _filterBy: string = '';

  sortedPedidos: Pedido[] = [];

  ultimoSort: string = 'nomeDesc';

  constructor(
    private carrinhoService: CarrinhoService,
    private entregaService: EntregaService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.telefone = +environment.telefone;
    this.modulo = 'Cozinha';
    this.local = environment.local;

    environment.fundoColoridoCardapio = false;
    environment.fundoColoridoPedido = false;
    environment.fundoColoridoCozinha = true;
    environment.fundoColoridoBar = false;
    environment.fundoColoridoEntrega = false;
    environment.fundoColoridoConta = false;

    if (
      +environment.telefone === 5511982551256 ||
      +environment.telefone === 5599999999998
    ) {
      this.pedidoService.read().subscribe((pedidos) => {
        this.pedidos = pedidos;
        this.filteredPedidos = this.pedidos
          .filter(
            (pedido: Pedido) =>
              pedido.status.toLowerCase() == 'confirmado' ||
              this.removerAcentos(pedido.status.toLowerCase()) ==
                'em preparação'
          )
          .filter(
            (pedido: Pedido) => pedido.carrinho.produto.categoria != 'bebidas'
          );
        switch (this.ultimoSort) {
          case 'nomeAsc || nomeDesc':
            return this.sortPedidosUpdateByName();
          case 'precoAsc':
            return this.sortPedidosUpdateByPrice();
          case 'precoDesc':
            return this.sortPedidosUpdateByPrice();
          case 'dataAsc':
            return this.sortPedidosUpdateByHorarioPedido();
          case 'dataDesc':
            return this.sortPedidosUpdateByHorarioPedido();
        }
      });

      this.updateSubscription = interval(5000).subscribe((val) => {
        this.pedidoService.read().subscribe((pedidos) => {
          this.pedidos = pedidos;
          this.filteredPedidos = this.pedidos
            .filter(
              (pedido: Pedido) =>
                pedido.status.toLowerCase() == 'confirmado' ||
                this.removerAcentos(pedido.status.toLowerCase()) ==
                  'em preparação'
            )
            .filter(
              (pedido: Pedido) => pedido.carrinho.produto.categoria != 'bebidas'
            );
          switch (this.ultimoSort) {
            case 'nomeAsc || nomeDesc':
              return this.sortPedidosUpdateByName();
            case 'precoAsc':
              return this.sortPedidosUpdateByPrice();
            case 'precoDesc':
              return this.sortPedidosUpdateByPrice();
            case 'dataAsc':
              return this.sortPedidosUpdateByHorarioPedido();
            case 'dataDesc':
              return this.sortPedidosUpdateByHorarioPedido();
          }
        });
      });
    } else {
      console.log('passei 1');

      this.pedidoService.read().subscribe((pedidos) => {
        this.pedidos = pedidos;
        this.filteredPedidos = this.pedidos
          .filter(
            (pedido: Pedido) =>
              pedido.status.toLowerCase() == 'confirmado' ||
              this.removerAcentos(pedido.status.toLowerCase()) ==
                'em preparação'
          )
          .filter(
            (pedido: Pedido) =>
              +pedido.carrinho.telefone - +environment.telefone === 0
          )
          .filter(
            (pedido: Pedido) => pedido.carrinho.produto.categoria != 'bebidas'
          );
        switch (this.ultimoSort) {
          case 'nomeAsc || nomeDesc':
            return this.sortPedidosUpdateByName();
          case 'precoAsc':
            return this.sortPedidosUpdateByPrice();
          case 'precoDesc':
            return this.sortPedidosUpdateByPrice();
          case 'dataAsc':
            return this.sortPedidosUpdateByHorarioPedido();
          case 'dataDesc':
            return this.sortPedidosUpdateByHorarioPedido();
        }
      });

      console.log('passei 2');

      this.updateSubscription = interval(5000).subscribe((val) => {
        this.pedidoService.read().subscribe((pedidos) => {
          this.pedidos = pedidos;
          this.filteredPedidos = this.pedidos
            .filter(
              (pedido: Pedido) =>
                pedido.status.toLowerCase() == 'confirmado' ||
                this.removerAcentos(pedido.status.toLowerCase()) ==
                  'em preparação'
            )
            .filter(
              (pedido: Pedido) =>
                +pedido.carrinho.telefone - +environment.telefone === 0
            )
            .filter(
              (pedido: Pedido) => pedido.carrinho.produto.categoria != 'bebidas'
            );
          switch (this.ultimoSort) {
            case 'nomeAsc || nomeDesc':
              return this.sortPedidosUpdateByName();
            case 'precoAsc':
              return this.sortPedidosUpdateByPrice();
            case 'precoDesc':
              return this.sortPedidosUpdateByPrice();
            case 'dataAsc':
              return this.sortPedidosUpdateByHorarioPedido();
            case 'dataDesc':
              return this.sortPedidosUpdateByHorarioPedido();
          }
        });
      });
    }
  }

  sortPedidosUpdateByName() {
    if (this.ultimoSort === 'nomeDesc') {
      this.ultimoSort = 'nomeAsc';
      this.sortedPedidos = [...this.filteredPedidos].sort((b, a) =>
        a.carrinho.produto.nome.localeCompare(b.carrinho.produto.nome)
      );
    } else {
      this.ultimoSort = 'nomeDesc';
      this.sortedPedidos = [...this.filteredPedidos].sort((a, b) =>
        a.carrinho.produto.nome.localeCompare(b.carrinho.produto.nome)
      );
    }
  }

  sortPedidosUpdateByPrice() {
    if (this.ultimoSort === 'precoAsc') {
      this.sortedPedidos = [...this.filteredPedidos].sort(
        (a, b) => a.carrinho.produto.preco - b.carrinho.produto.preco
      );
    } else {
      this.sortedPedidos = [...this.filteredPedidos].sort(
        (b, a) => a.carrinho.produto.preco - b.carrinho.produto.preco
      );
    }
  }

  sortPedidosUpdateByHorarioPedido() {
    if (this.ultimoSort === 'dataAsc') {
      this.sortedPedidos = [...this.filteredPedidos].sort(
        (a, b) =>
          new Date(a.carrinho.data_criacao).getTime() -
          new Date(b.carrinho.data_criacao).getTime()
      );
    } else {
      this.sortedPedidos = [...this.filteredPedidos].sort(
        (b, a) =>
          new Date(a.carrinho.data_criacao).getTime() -
          new Date(b.carrinho.data_criacao).getTime()
      );
    }
  }

  removerAcentos(str: string): string {
    // Converte para minúsculas e remove os diacríticos usando Unicode
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // tslint:disable-next-line:typedef
  get filter() {
    return this._filterBy;
  }

  set filter(value: string) {
    this._filterBy = value;

    if (
      +environment.telefone === 5511982551256 ||
      +environment.telefone === 5599999999998
    ) {
      this.filteredPedidos = this.pedidos
        .filter(
          (pedido: Pedido) =>
            pedido.status.toLowerCase() == 'confirmado' ||
            this.removerAcentos(pedido.status.toLowerCase()) == 'em preparação'
        )
        .filter((pedido: Pedido) =>
          this.removerAcentos(pedido.carrinho.produto.nome).includes(
            this.removerAcentos(this._filterBy)
          )
        )
        .filter(
          (pedido: Pedido) => pedido.carrinho.produto.categoria !== 'bebidas'
        )
        .sort((a, b) =>
          a.carrinho.produto.nome.localeCompare(b.carrinho.produto.nome)
        );
    } else {
      this.filteredPedidos = this.pedidos
        .filter(
          (pedido: Pedido) =>
            pedido.status.toLowerCase() == 'confirmado' ||
            this.removerAcentos(pedido.status.toLowerCase()) == 'em preparação'
        )
        .filter(
          (pedido: Pedido) => pedido.telefone - environment.telefone === 0
        )
        .filter((pedido: Pedido) =>
          this.removerAcentos(pedido.carrinho.produto.nome).includes(
            this.removerAcentos(this._filterBy)
          )
        )
        .filter(
          (pedido: Pedido) => pedido.carrinho.produto.categoria !== 'bebidas'
        )
        .sort((a, b) =>
          a.carrinho.produto.nome.localeCompare(b.carrinho.produto.nome)
        );
    }

    this.sortPedidosUpdateByName();
  }

  entregaCreate(pedidoId: number): void {
    // tslint:disable-next-line:no-unused-expression
    this.pedidoService.readById(pedidoId).subscribe((pedido) => {
      this.pedido = pedido;

      let index = this.sortedPedidos.findIndex(
        (pedido) => pedido.id === pedidoId
      );
      this.sortedPedidos[index].status = 'Saiu para entrega';

      this.pedido.status = 'Saiu para entrega';
      this.pedido.carrinho.status = 'Saiu para entrega';
      this.atualizarPedido(this.pedido);

      this.carrinhoService
        .readById(+this.pedido.carrinho.id!)
        .subscribe((carrinho) => {
          this.carrinho = carrinho;
          this.carrinho.status = 'Saiu para entrega';
          this.carrinho.observacao = this.pedido.observacao;
          this.atualizarCarrinho(this.carrinho);
        });

      this.entrega.pedido = this.pedido;

      this.entregaService.create(this.entrega).subscribe(() => {
        this.entregaService.showMessage('Saiu para entrega');
      });
    });
  }

  // tslint:disable-next-line:typedef
  openPopup(pedidoId: number): void {
    // tslint:disable-next-line:no-unused-expression
    this.pedidoService.readById(pedidoId).subscribe((pedido) => {
      this.pedido = pedido;
      this.carrinho = pedido.carrinho;
      this.produto = pedido.carrinho.produto;
    });

    this.displayStyle = 'block';
  }

  // tslint:disable-next-line:typedef
  closePopup() {
    this.displayStyle = 'none';
    // tslint:disable-next-line:prefer-const
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  // tslint:disable-next-line:typedef
  minus(pedido: Pedido) {
    if (pedido.carrinho.quantidade !== 1) {
      pedido.carrinho.quantidade--;
      this.atualizarCarrinho(pedido.carrinho);
    }
  }

  // tslint:disable-next-line:typedef
  plus(pedido: Pedido) {
    if (pedido.carrinho.quantidade !== 10) {
      pedido.carrinho.quantidade++;
      this.atualizarCarrinho(pedido.carrinho);
    }
  }

  // tslint:disable-next-line:typedef
  atualizarObservacao(pedido: Pedido) {
    this.atualizarCarrinho(pedido.carrinho);
  }

  // deletePedido(pedidoId: number) {
  //     this.pedidoService.delete(pedidoId).subscribe(() => {
  //     this.pedidoService.showMessage('Pedido Excluído');
  //     this.router.navigate(['/pedido']);
  //   });

  //     let index = this.sortedEntregas.findIndex(entrega => entrega.id === entregaId);
  //     this.sortedEntregas[index].data_criacao = new Date();
  //     this.entrega.data_criacao =  this.sortedEntregas[index].data_criacao ;

  // }

  atualizarPedido(pedido: Pedido) {
    const isUpdate = new Promise<Pedido>((resolve, reject) =>
      this.pedidoService.update(pedido).subscribe(() => {
        resolve(this.pedido);
      })
    );

    isUpdate
      .then((value) => {
        this.pedidoService.showMessage('Pedido atualizado');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }

  // tslint:disable-next-line:typedef
  excluirPedido(pedidoId: number) {
    this.pedidoService.readById(pedidoId).subscribe((pedido) => {
      this.pedido = pedido;

      const isDelete = new Promise<string>((resolve, reject) =>
        this.pedidoService.delete(pedidoId).subscribe(() => {
          this.message = 'Pedido excluído';
          resolve(this.message);
        })
      );

      isDelete
        .then((value) => {
          this.pedido.carrinho.status = 'Excluído';
          this.atualizarCarrinho(this.pedido.carrinho);

          let index = this.sortedPedidos.findIndex(
            (pedido) => pedido.id === pedidoId
          );
          this.sortedPedidos = this.sortedPedidos.splice(1, index);

          this.pedidoService.showMessage('Pedido excluìdo');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    });
  }

  atualizarCarrinho(carrinho: Carrinho) {
    const isUpdate = new Promise<Carrinho>((resolve, reject) =>
      this.carrinhoService.update(carrinho).subscribe(() => {
        resolve(this.carrinho);
      })
    );

    isUpdate
      .then((value) => {
        this.carrinhoService.showMessage('Carrinho atualizado');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }
}
