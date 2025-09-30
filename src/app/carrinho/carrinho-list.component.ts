import { Produto } from '../produto/produto';
import { Router, RouterLink } from '@angular/router';
import { CarrinhoService } from './carrinho.service';
import { Carrinho } from './carrinho';
import { Component, OnInit } from '@angular/core';
import { Pedido } from '../pedido/pedido';
import { PedidoService } from '../pedido/pedido.service';
import { debounceTime, interval, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { StarComponent } from '../star/star.component';
import { CaminhoMenuComponent } from '../caminho-menu/caminho-menu.component';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { initializeApp } from '@angular/fire/app';
import { consumerBeforeComputation } from '@angular/core/primitives/signals';
import { Subject } from 'rxjs';


@Component({
  standalone: true,

  imports: [
    CaminhoMenuComponent,
    CommonModule,
    FormsModule,
    RouterLink,
    StarComponent

  ],
  templateUrl: './carrinho-list.component.html',
  styleUrls: ['./carrinho-list.component.css'],
  
})

export class CarrinhoListComponent implements OnInit {

  private readSubscription!: Subscription;
  private updateSubscription!: Subscription;

  login: boolean = false;
  message: string = '';

  // modulo: string;
  // local: string;
  fundoColoridoPedido: boolean = false;

  // tslint:disable-next-line:variable-name
  _categoryId: string = '';

  filteredCarrinhos: Carrinho[] = [];

  sortedCarrinhos: any[] = [];

  carrinhos: Carrinho[] = [];
  // tslint:disable-next-line:variable-name
  pedido = {} as Pedido;

  produto = {} as Produto;

  carrinho = {} as Carrinho;
  // tslint:disable-next-line:variable-name
  _carrinho = {} as Carrinho;

  // tslint:disable-next-line:variable-name
  _carrinhos: Carrinho[] = [];

  // tslint:disable-next-line:variable-name
  _filterBy: string = '';

  _debouncetime: boolean = false;

  statusPendente: boolean = false;

  container: any;

  searchControl = new FormControl('');

  data: any;

  ultimoSort: string = 'nome';

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    // this.modulo = 'Pedido';
    // this.local = environment.local;
    this.carrinho.quantidade = 1;



    environment.fundoColoridoCardapio = false;
    environment.fundoColoridoPedido = true;
    environment.fundoColoridoCozinha = false;
    environment.fundoColoridoBar = false;
    environment.fundoColoridoEntrega = false;
    environment.fundoColoridoConta = false;


    if (+environment.telefone === 5511982551256 || +environment.telefone === 5599999999997) {

      this.carrinhoService.read().subscribe(carrinhos => {
        this.carrinhos = carrinhos;
        this.filteredCarrinhos = this.carrinhos
          .filter((carrinho: Carrinho) => carrinho.enviado !== true);
        switch (this.ultimoSort) {
          case ('nome'):
            return this.sortCarrinhosByName();
          case ('preco'):
            return this.sortCarrinhosByPrice();
          case ('data'):
            return this.sortCarrinhosByHorarioPedido();
        }

      });

      this.updateSubscription = interval(5000).subscribe(
        (val) => {
          this.carrinhoService.read().subscribe(carrinhos => {
            this.carrinhos = carrinhos;
            this.filteredCarrinhos = this.carrinhos
              .filter((carrinho: Carrinho) => carrinho.enviado !== true);
            switch (this.ultimoSort) {
              case ('nome'):
                return this.sortCarrinhosByName();
              case ('preco'):
                return this.sortCarrinhosByPrice();
              case ('data'):
                return this.sortCarrinhosByHorarioPedido();
            }

          });
        });


    } else {


      this.carrinhoService.read().subscribe(carrinhos => {
        this.carrinhos = carrinhos;
        this.filteredCarrinhos = this.carrinhos
          .filter((carrinho: Carrinho) => carrinho.telefone - environment.telefone === 0)
          .filter((carrinho: Carrinho) => carrinho.enviado !== true);
        switch (this.ultimoSort) {
          case ('nome'):
            return this.sortCarrinhosByName();
          case ('preco'):
            return this.sortCarrinhosByPrice();
          case ('data'):
            return this.sortCarrinhosByHorarioPedido();
        }


      });

    }

        this.login = this.carrinho.telefone - environment.telefone === 0


  }

  sortCarrinhosByName() {
    this.sortedCarrinhos = [...this.filteredCarrinhos].sort((a, b) => a.produto.nome.localeCompare(b.produto.nome));
    this.ultimoSort = 'nome;'
  }

  sortCarrinhosByPrice() {
    this.sortedCarrinhos = [...this.filteredCarrinhos].sort((a, b) => a.produto.preco - b.produto.preco);
    this.ultimoSort = 'preco;'
  }

  sortCarrinhosByHorarioPedido() {
    this.sortedCarrinhos = [...this.filteredCarrinhos].sort((b, a) => new Date(a.data_criacao).getTime() - new Date(b.data_criacao).getTime());
    this.ultimoSort = 'data;'
  }

  removerAcentos(str: string): string {
    // Converte para minúsculas e remove os diacríticos usando Unicode
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // tslint:disable-next-line:typedef
  get filter() {
    return this._filterBy;
  }

  set filter(value: string) {
    this._filterBy = value;

    if (+environment.telefone === 5511982551256 || +environment.telefone === 5599999999997) {

      this.filteredCarrinhos =
        this.carrinhos
          .filter((carrinho: Carrinho) => carrinho.enviado !== true)
          .filter((carrinho: Carrinho) => this.removerAcentos(carrinho.produto.nome).includes(this.removerAcentos(this._filterBy)));

    } else {

      this.filteredCarrinhos =
        this.carrinhos
          .filter((carrinho: Carrinho) => carrinho.enviado !== true)
          .filter((carrinho: Carrinho) => environment.telefone - carrinho.telefone === 0)
          .filter((carrinho: Carrinho) => this.removerAcentos(carrinho.produto.nome).includes(this.removerAcentos(this._filterBy)));

    }
    this.sortCarrinhosByName();

  }
  // tslint:disable-next-line:quotemark
  // tslint:disable-next-line:member-ordering
  displayStyle = 'none';

  // tslint:disable-next-line:typedef
  openPopup(carrinhoId: number): void {

    // tslint:disable-next-line:no-unused-expression
    this.carrinhoService.readById(carrinhoId).subscribe(carrinho => {
      this.carrinho = carrinho;

      this.produto = this.carrinho.produto;
      if (this.carrinho.status.toLowerCase() === 'pendente') {
        this.statusPendente = true;
      }
    });

    this.displayStyle = 'block';
  }

  // tslint:disable-next-line:typedef
  closePopup() {
    this.displayStyle = 'none';
  }


  pedidoCreate(carrinhoId: number): void {

    // tslint:disable-next-line:no-unused-expression
    this.carrinhoService.readById(carrinhoId).subscribe(carrinho => {
      this.carrinho = carrinho;

      if (carrinho.enviado !== true) {

        this.carrinho.enviado = false; 
        this.carrinho.status = 'Confirmado';


        let index = this.sortedCarrinhos.findIndex(carrinho => carrinho.id === carrinhoId);
        this.sortedCarrinhos[index].status = 'Confirmado';      

        this.atualizarCarrinho(this.carrinho);


        this.pedido.telefone = this.carrinho.telefone;
        this.pedido.local = this.carrinho.local;
        this.pedido.quantidade = this.carrinho.quantidade;
        this.pedido.observacao = this.carrinho.observacao;
        this.pedido.isencao = this.carrinho.isencao;
        this.pedido.data_criacao = this.carrinho.data_criacao;
        this.pedido.enviado = false;
        this.pedido.status = 'Confirmado';
        this.pedido.carrinho = this.carrinho;

        this.pedido.carrinho.produto = this.carrinho.produto;

        const isCreate = new Promise<Pedido>((resolve, reject) =>
          this.pedidoService.create(this.pedido).subscribe(() => {
            resolve(this.pedido);
          })
        )

        isCreate.then ((value) => {
          this.pedidoService.showMessage('Pedido solicitado');
        }).catch((error) =>{
          console.log(error);
        }).finally(() => {
        })
      }
    });

    this.closePopup();
  }

  // tslint:disable-next-line:typedef
  atualizarCarrinho(carrinho: Carrinho) {

    const isCreate = new Promise<Carrinho>((resolve, reject) =>
        this.carrinhoService.update(carrinho).subscribe(() => {
          resolve(this.carrinho);
        })
      )

      isCreate.then ((value) => {
        this.carrinhoService.showMessage('Carrinho atualizado');
      }).catch((error) =>{
        console.log(error);
      }).finally(() => {
      })
  }

  // tslint:disable-next-line:typedef
  excluirCarrinho(carrinhoId: number) {
  
    this.carrinhoService.readById(carrinhoId).subscribe(carrinho => {
      this.carrinho = carrinho;

      let index = this.sortedCarrinhos.findIndex(carrinho => carrinho.id === carrinhoId);
      this.sortedCarrinhos.splice(index, 1);      

      const isDelete = new Promise<string>((resolve, reject) =>
        this.carrinhoService.delete(carrinhoId).subscribe(() => {
          this.message = 'Carrinho excluído'
          resolve(this.message);
        })
      )


      isDelete.then((value) => {
        this.carrinhoService.showMessage('Carrinho excluìdo');
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.closePopup();
      })

      
    })

  }

  // tslint:disable-next-line:typedef
  minus(carrinho: Carrinho) {
    if (carrinho.quantidade !== 1) {
      carrinho.quantidade--;
      this.atualizarCarrinho(carrinho)
    }
  }

  // tslint:disable-next-line:typedef
  plus(carrinho: Carrinho) {
    if (carrinho.quantidade !== 10) {
      carrinho.quantidade++;
      this.atualizarCarrinho(carrinho)
    }
  }

}

