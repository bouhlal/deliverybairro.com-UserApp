// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Plano = {
  "FREE": "FREE",
  "BASIC": "BASIC",
  "PRO": "PRO",
  "PREMIUM": "PREMIUM"
};

const Situacao = {
  "ATIVO": "ATIVO",
  "INATIVO": "INATIVO"
};

const Uf = {
  "AC": "AC",
  "AL": "AL",
  "AP": "AP",
  "AM": "AM",
  "BA": "BA",
  "CE": "CE",
  "DF": "DF",
  "ES": "ES",
  "GO": "GO",
  "MA": "MA",
  "MT": "MT",
  "MS": "MS",
  "MG": "MG",
  "PA": "PA",
  "PB": "PB",
  "PE": "PE",
  "PI": "PI",
  "PR": "PR",
  "RJ": "RJ",
  "RN": "RN",
  "RS": "RS",
  "RO": "RO",
  "RR": "RR",
  "SC": "SC",
  "SE": "SE",
  "SP": "SP",
  "TO": "TO"
};

const Status = {
  "NOVO": "NOVO",
  "AGUARDANDO": "AGUARDANDO",
  "PREPARANDO": "PREPARANDO",
  "PRONTO_PARA_RETIRADA": "PRONTO_PARA_RETIRADA",
  "RETIRADO": "RETIRADO",
  "ENTREGUE": "ENTREGUE",
  "FINALIZADO": "FINALIZADO",
  "CANCELADO": "CANCELADO"
};

const Transporte = {
  "DRIVING": "DRIVING",
  "BICYCLING": "BICYCLING"
};

const { BasketItem, Basket, Categoria, Delivery, Produto, User, Pedido, Item, Courier, DeliveryCategoria, DeliveryProduto } = initSchema(schema);

export {
  BasketItem,
  Basket,
  Categoria,
  Delivery,
  Produto,
  User,
  Pedido,
  Item,
  Courier,
  DeliveryCategoria,
  DeliveryProduto,
  Plano,
  Situacao,
  Uf,
  Status,
  Transporte
};