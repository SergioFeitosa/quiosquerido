import { EntregaService } from './entrega.service';
import { Entrega } from './entrega';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto/produto';
import { Pedido } from '../pedido/pedido';
import { PedidoService } from '../pedido/pedido.service';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { Carrinho } from '../carrinho/carrinho';
import { ActivatedRoute, Router } from '@angular/router';
import { CaminhoMenuComponent } from '../caminho-menu/caminho-menu.component';
import { StarComponent } from '../star/star.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { interval, Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({ 
  templateUrl: './entrega-list.component.html',
  styleUrls: ['./entrega-list.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CaminhoMenuComponent,
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    StarComponent

  ]

})

export class EntregaListComponent implements OnInit {

  private readSubscription!: Subscription;
  private updateSubscription!: Subscription;

  telefone: number = 0;
  // modulo: string;
  // local: string;

  fundoColoridoEntrega: boolean = false;

  // tslint:disable-next-line:variable-name
  _categoryId: string = '';

  filteredEntregas: Entrega[] = [];
  entregas: Entrega[] = [];
  sortedEntregas: any[] = [];
  produto = {} as Produto;
  pedido = {} as Pedido;
  carrinho = {} as Carrinho;
  entrega = {} as Entrega;

  // tslint:disable-next-line:variable-name
  _entregas: Entrega[] = [];

  // tslint:disable-next-line:variable-name
  _filterBy: string = '';

  ultimoSort: string = 'nomeDesc';

  constructor(
    private entregaService: EntregaService,
    private pedidoService: PedidoService,
    private carrinhoService: CarrinhoService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {

    this.telefone = environment.telefone;
    // this.modulo = 'Entrega';
    // this.local = environment.local;

    environment.fundoColoridoCardapio = false;
    environment.fundoColoridoPedido = false;
    environment.fundoColoridoCozinha = false;
    environment.fundoColoridoBar = false;
    environment.fundoColoridoEntrega = true;
    environment.fundoColoridoConta = false;


    if (+environment.telefone === 5511982551256 || +environment.telefone === 5599999999996) {
      this.entregaService.read().subscribe(entregas => {
        this.entregas = entregas;
        this.filteredEntregas = this.entregas;
        switch (this.ultimoSort) {
          case ('nomeAsc'):
            return this.sortEntregasByName();
          case ('nomeDesc'):
            return this.sortEntregasByName();
          case ('precoAsc'):
            return this.sortEntregasByPrice();
          case ('precoDesc'):
            return this.sortEntregasByPrice();
          case ('dataAsc'):
            return this.sortEntregasByHorarioPedido();
          case ('dataDesc'):
            return this.sortEntregasByHorarioPedido();
          case ('dataEntregaAsc'):
            return this.sortEntregasByHorarioEntrega();
          case ('dataEntregaDesc'):
            return this.sortEntregasByHorarioEntrega();
        }
      });

      this.updateSubscription = interval(5000).subscribe(
        (val) => {
          this.entregaService.read().subscribe(entregas => {
            this.entregas = entregas;
            this.filteredEntregas = this.entregas;
          });
        switch (this.ultimoSort) {
          case ('nomeAsc'):
            return this.sortEntregasUpdateByName();
          case ('nomeDesc'):
            return this.sortEntregasUpdateByName();
          case ('precoAsc'):
            return this.sortEntregasUpdateByPrice();
          case ('precoDesc'):
            return this.sortEntregasUpdateByPrice();
          case ('dataAsc'):
            return this.sortEntregasUpdateByHorarioPedido();
          case ('dataDesc'):
            return this.sortEntregasUpdateByHorarioPedido();
          case ('dataEntregaAsc'):
            return this.sortEntregasUpdateByHorarioEntrega();
          case ('dataEntregaDesc'):
            return this.sortEntregasUpdateByHorarioEntrega();
        }

        });

    } else {

      this.entregaService.read().subscribe(entregas => {
        this.entregas = entregas;
        this.filteredEntregas = this.entregas
          .filter((entrega: Entrega) => entrega.pedido.telefone - environment.telefone === 0);
        switch (this.ultimoSort) {
          case ('nomeAsc'):
            return this.sortEntregasByName();
          case ('nomeDesc'):
            return this.sortEntregasByName();
          case ('precoAsc'):
            return this.sortEntregasByPrice();
          case ('precoDesc'):
            return this.sortEntregasByPrice();
          case ('dataAsc'):
            return this.sortEntregasByHorarioPedido();
          case ('dataDesc'):
            return this.sortEntregasByHorarioPedido();
          case ('dataEntregaAsc'):
            return this.sortEntregasByHorarioEntrega();
          case ('dataEntregaDesc'):
            return this.sortEntregasByHorarioEntrega();
        }
      });

      this.updateSubscription = interval(5000).subscribe(
        (val) => {
          this.entregaService.read().subscribe(entregas => {
            this.entregas = entregas;
          this.filteredEntregas = this.entregas
            .filter((entrega: Entrega) => entrega.pedido.telefone - environment.telefone === 0);
          });
        switch (this.ultimoSort) {
          case ('nomeAsc'):
            return this.sortEntregasUpdateByName();
          case ('nomeDesc'):
            return this.sortEntregasUpdateByName();
          case ('precoAsc'):
            return this.sortEntregasUpdateByPrice();
          case ('precoDesc'):
            return this.sortEntregasUpdateByPrice();
          case ('dataAsc'):
            return this.sortEntregasUpdateByHorarioPedido();
          case ('dataDesc'):
            return this.sortEntregasUpdateByHorarioPedido();
          case ('dataEntregaAsc'):
            return this.sortEntregasUpdateByHorarioEntrega();
          case ('dataEntregaDesc'):
            return this.sortEntregasUpdateByHorarioEntrega();
        }

        });

    }
  }
    // tslint:disable-next-line:typedef
  get filter() {
    return this._filterBy;
  }

  set filter(value: string) {
    this._filterBy = value;

    if (+environment.telefone === 5511982551256 || +environment.telefone === 5599999999996) {
      this.filteredEntregas =
        this.entregas
          .filter((entrega: Entrega) => this.removerAcentos(entrega.pedido.carrinho.produto.nome).includes(this.removerAcentos(this._filterBy)))

    } else {

      this.filteredEntregas =
        this.entregas
          .filter((entrega: Entrega) => entrega.pedido.telefone - environment.telefone === 0)
          .filter((entrega: Entrega) => this.removerAcentos(entrega.pedido.carrinho.produto.nome).includes(this.removerAcentos(this._filterBy)))

    }
    this.sortEntregasByName();
  }

  sortEntregasByName() {
    if (this.ultimoSort === 'nomeAsc') {
      this.ultimoSort = 'nomeDesc'
      this.sortedEntregas = [...this.filteredEntregas].sort((b, a) => a.pedido.carrinho.produto.nome.localeCompare(b.pedido.carrinho.produto.nome));
    } else {
      this.ultimoSort = 'nomeAsc'
      this.sortedEntregas = [...this.filteredEntregas].sort((a, b) => a.pedido.carrinho.produto.nome.localeCompare(b.pedido.carrinho.produto.nome));
    }
  }

  sortEntregasUpdateByName() {
    if (this.ultimoSort === 'nomeAsc') {
      this.sortedEntregas = [...this.filteredEntregas].sort((a, b) => a.pedido.carrinho.produto.nome.localeCompare(b.pedido.carrinho.produto.nome));
    } else {
      this.sortedEntregas = [...this.filteredEntregas].sort((b, a) => a.pedido.carrinho.produto.nome.localeCompare(b.pedido.carrinho.produto.nome));
    }
  }

  sortEntregasByPrice() {
    if (this.ultimoSort === 'precoAsc') {
      this.ultimoSort = 'precoDesc'
      this.sortedEntregas = [...this.filteredEntregas].sort((b, a) => a.pedido.carrinho.produto.preco - b.pedido.carrinho.produto.preco);
    } else {
      this.ultimoSort = 'precoAsc'
      this.sortedEntregas = [...this.filteredEntregas].sort((a, b) => a.pedido.carrinho.produto.preco - b.pedido.carrinho.produto.preco);
    }

  }

  sortEntregasUpdateByPrice() {
    if (this.ultimoSort === 'precoAsc') {
      this.sortedEntregas = [...this.filteredEntregas].sort((a, b) => a.pedido.carrinho.produto.preco - b.pedido.carrinho.produto.preco);
    } else {
      this.sortedEntregas = [...this.filteredEntregas].sort((b, a) => a.pedido.carrinho.produto.preco - b.pedido.carrinho.produto.preco);
    }

  }

  sortEntregasByHorarioPedido() {
    if (this.ultimoSort === 'dataAsc') {
      this.ultimoSort = 'dataDesc'
      this.sortedEntregas = [...this.filteredEntregas].sort((b, a) => new Date(a.pedido.carrinho.data_criacao).getTime() - new Date(b.pedido.carrinho.data_criacao).getTime());
    } else {
      this.ultimoSort = 'dataAsc'
      this.sortedEntregas = [...this.filteredEntregas].sort((a, b) => new Date(a.pedido.carrinho.data_criacao).getTime() - new Date(b.pedido.carrinho.data_criacao).getTime());
    }

  }

  sortEntregasUpdateByHorarioPedido() {
    if (this.ultimoSort === 'dataAsc') {
      this.sortedEntregas = [...this.filteredEntregas].sort((a, b) => new Date(a.pedido.carrinho.data_criacao).getTime() - new Date(b.pedido.carrinho.data_criacao).getTime());
    } else {
      this.sortedEntregas = [...this.filteredEntregas].sort((b, a) => new Date(a.pedido.carrinho.data_criacao).getTime() - new Date(b.pedido.carrinho.data_criacao).getTime());
    }

  }

  sortEntregasByHorarioEntrega() {
    if (this.ultimoSort === 'dataEntregaAsc') {
      this.ultimoSort = 'dataEntregaDesc'
      this.sortedEntregas = [...this.filteredEntregas].sort((b, a) => new Date(a.data_criacao).getTime() - new Date(b.data_criacao).getTime());
    } else {
      this.ultimoSort = 'dataEntregaAsc'
      this.sortedEntregas = [...this.filteredEntregas].sort((a, b) => new Date(a.data_criacao).getTime() - new Date(b.data_criacao).getTime());
    }

  }

  sortEntregasUpdateByHorarioEntrega() {
    if (this.ultimoSort === 'dataEntregaAsc') {
      this.sortedEntregas = [...this.filteredEntregas].sort((a, b) => new Date(a.data_criacao).getTime() - new Date(b.data_criacao).getTime());
    } else {
      this.sortedEntregas = [...this.filteredEntregas].sort((b, a) => new Date(a.data_criacao).getTime() - new Date(b.data_criacao).getTime());
    }

  }

  removerAcentos(str: string): string {
    // Converte para minúsculas e remove os diacríticos usando Unicode
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }


  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayStyle = 'none';

  // tslint:disable-next-line:typedef
  openPopup(entregaId: number): void {
    // tslint:disable-next-line:no-unused-expression
    this.entregaService.readById(entregaId).subscribe(entrega => {
      this.entrega = entrega;
      this.pedido = this.entrega.pedido;
      this.carrinho = this.entrega.pedido.carrinho;
      this.produto = this.entrega.pedido.carrinho.produto;
    });

    this.displayStyle = 'block';
  }

  // tslint:disable-next-line:typedef
  closePopup() {
    this.displayStyle = 'none';
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);

  }

  entregaUpdate(entregaId: number) {

    // tslint:disable-next-line:no-unused-expression
    this.entregaService.readById(entregaId).subscribe(entrega => {
      this.entrega = entrega;

      // tslint:disable-next-line:no-unused-expression
      this.carrinhoService.readById(
        this.entrega.pedido.carrinho.id!).subscribe(carrinho => {
        this.carrinho = carrinho;
        this.carrinho.status = 'Pedido entregue';
        this.atualizarCarrinho(this.carrinho);
      })

      // tslint:disable-next-line:no-unused-expression
      this.pedidoService.readById(this.entrega.pedido.id!).subscribe(pedido => {
        this.pedido = pedido;
        this.pedido.status = 'Pedido entregue';
        this.pedido.carrinho = this.carrinho;

        this.atualizarPedido(this.pedido);

      })

      this.entrega.pedido = this.pedido;

      let index = this.sortedEntregas.findIndex(entrega => entrega.id === entregaId);
      this.sortedEntregas[index].data_criacao = new Date();      
      this.entrega.data_criacao =  this.sortedEntregas[index].data_criacao ;

      this.atualizarEntrega(this.entrega);
    });
  }

  // tslint:disable-next-line:typedef
  atualizarPedido(pedido: Pedido) {
    this.pedidoService.update(pedido).subscribe(() => {
      this.pedidoService.showMessage('Pedido Entregue');
    });
  }

  // tslint:disable-next-line:typedef
  atualizarCarrinho(carrinho: Carrinho) {
    this.carrinhoService.update(carrinho).subscribe(() => {
      this.carrinhoService.showMessage('Pedido Entregue');
    });
  }

  atualizarEntrega(entrega: Entrega) {
  this.entregaService.update(entrega).subscribe(() => {
      this.entregaService.showMessage('Pedido Entregue');
    });

  }
}
