import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from './pedido.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from './pedido';

@Component({
  selector: 'app-pedido-delete',
  templateUrl: './pedido-delete.component.html',
})

export class PedidoDeleteComponent implements OnInit {

  pedido = {} as Pedido;


  constructor(private pedidoService: PedidoService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) { }

  ngOnInit(): void {

    const pedidoId = +this.activatedRoute.snapshot.paramMap.get('pedidoId')!;

    this.pedidoService.delete(pedidoId).subscribe(() => {
      this.pedidoService.showMessage('Pedido Excluído');
      this.router.navigate(['/pedido']);
    });

  }

  deletePedido(id: number): void {
    this.pedidoService.delete(id).subscribe(() => {
      this.pedidoService.showMessage('Pedido Excluído');
      this.router.navigate(['/pedido']);
    });
  }
}
