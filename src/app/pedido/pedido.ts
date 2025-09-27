import { Carrinho } from '../carrinho/carrinho';

export interface Pedido {

  id?: number;
  telefone: number;
  quantidade: number;
  local: string;
  observacao: string;
  enviado: boolean;
  isencao: boolean;
  data_criacao: Date;
  status: string;

  carrinho: Carrinho;

}
