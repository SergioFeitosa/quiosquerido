import { Routes } from '@angular/router';
import { CardapioPrincipalComponent } from './cardapioprincipal/cardapio-principal.component';
import { CarrinhoListComponent } from './carrinho/carrinho-list.component';
import { CarrinhoUpdateComponent } from './carrinho/carrinho-update.component';
import { CarrinhoDeleteComponent } from './carrinho/carrinho-delete.component';
import { EntregaListComponent } from './entrega/entrega-list.component';
import { PedidoListComponent } from './pedido/pedido-list.component';
import { PedidoUpdateComponent } from './pedido/pedido-update.component';
import { PedidoDeleteComponent } from './pedido/pedido-delete.component';
import { PedidoBarListComponent } from './pedidoBar/pedidoBar-list.component';
import { ProdutoListComponent } from './produto/produto-list.component';
import { EntregaUpdateComponent } from './entrega/entrega-update.component';
import { ContaListComponent } from './conta/conta-list.component';
import { FechamentoListComponent } from './fechamento/fechamento-list.component';
import { CodeComponent } from './code/code.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { Error404Component } from './Error404/error-404.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RenderMode, ServerRoute } from '@angular/ssr';

export const routes: Routes = [
      {
        path: '', component: CardapioPrincipalComponent,
      },
      {
        path: 'cardapioPrincipal', component: CardapioPrincipalComponent,
      },
      {
        path: 'carrinho', component: CarrinhoListComponent
      },
      {
        path: 'carrinho/:carrinhoId', component: CarrinhoListComponent
      },
      {
        path: 'carrinho/telefone/:telefone', component: CarrinhoListComponent
      },
      {
        path: 'carrinho/update/:carrinhoId', component: CarrinhoUpdateComponent
      },
      {
        path: 'carrinho/delete/:carrinhoId', component: CarrinhoDeleteComponent
      },
      {
        path: 'code', component: CodeComponent
      },
      {
        path: 'conta', component: ContaListComponent,
        data: {
          alwaysRefresh: true
       }
      },
      // {
      //   path: 'dashboard', component: DashboardComponent
      // },
      {
        path: 'entrega', component: EntregaListComponent
      },
      {
        path: 'entrega/update/:entregaId', component: EntregaUpdateComponent
      },
      {
        path: 'fechamento', component: FechamentoListComponent
      },
      {
        path: 'navBar', component: NavBarComponent,
      },
      {
        path: 'pedido', component: PedidoListComponent
      },
      {
        path: 'pedido/:pedidoId', component: PedidoListComponent
      },
      {
        path: 'pedido/telefone/:telefone', component: PedidoListComponent
      },
      {
        path: 'pedido/update/:pedidoId', component: PedidoUpdateComponent
      },
      {
        path: 'pedido/delete/:pedidoId', component: PedidoDeleteComponent
      },
      {
        path: 'pedidoBar', component: PedidoBarListComponent
      },
      {
        path: 'phone', component: PhoneNumberComponent
      },
      {
        path: 'produto/**', component: ProdutoListComponent
      },
      {
        path: 'produto/:categoriaId', component: ProdutoListComponent, title: 'Produtos por categoria'
      }, 
      {
        path: '**', component: Error404Component
      }
    
];
