import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum Situacao {
  ATIVO = "ATIVO",
  INATIVO = "INATIVO"
}

export enum Plano {
  FREE = "FREE",
  BASIC = "BASIC",
  PRO = "PRO",
  PREMIUM = "PREMIUM"
}

export enum Status {
  NOVO = "NOVO",
  AGUARDANDO = "AGUARDANDO",
  PREPARANDO = "PREPARANDO",
  PRONTO_PARA_RETIRADA = "PRONTO_PARA_RETIRADA",
  RETIRADO = "RETIRADO",
  ENTREGUE = "ENTREGUE",
  FINALIZADO = "FINALIZADO",
  CANCELADO = "CANCELADO"
}

export enum Transporte {
  DRIVING = "DRIVING",
  BICYCLING = "BICYCLING"
}

export enum Uf {
  AC = "AC",
  AL = "AL",
  AP = "AP",
  AM = "AM",
  BA = "BA",
  CE = "CE",
  DF = "DF",
  ES = "ES",
  GO = "GO",
  MA = "MA",
  MT = "MT",
  MS = "MS",
  MG = "MG",
  PA = "PA",
  PB = "PB",
  PE = "PE",
  PI = "PI",
  PR = "PR",
  RJ = "RJ",
  RN = "RN",
  RS = "RS",
  RO = "RO",
  RR = "RR",
  SC = "SC",
  SE = "SE",
  SP = "SP",
  TO = "TO"
}



type EagerPedido = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Pedido, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dt_pedido?: string | null;
  readonly vr_subtotal?: number | null;
  readonly vr_taxaentrega?: number | null;
  readonly vr_total?: number | null;
  readonly status?: Status | keyof typeof Status | null;
  readonly token_sms?: string | null;
  readonly Items?: (Item | null)[] | null;
  readonly Delivery?: Delivery | null;
  readonly Courier?: Courier | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly pedidoDeliveryId?: string | null;
  readonly pedidoCourierId?: string | null;
}

type LazyPedido = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Pedido, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly dt_pedido?: string | null;
  readonly vr_subtotal?: number | null;
  readonly vr_taxaentrega?: number | null;
  readonly vr_total?: number | null;
  readonly status?: Status | keyof typeof Status | null;
  readonly token_sms?: string | null;
  readonly Items: AsyncCollection<Item>;
  readonly Delivery: AsyncItem<Delivery | undefined>;
  readonly Courier: AsyncItem<Courier | undefined>;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly pedidoDeliveryId?: string | null;
  readonly pedidoCourierId?: string | null;
}

export declare type Pedido = LazyLoading extends LazyLoadingDisabled ? EagerPedido : LazyPedido

export declare const Pedido: (new (init: ModelInit<Pedido>) => Pedido) & {
  copyOf(source: Pedido, mutator: (draft: MutableModel<Pedido>) => MutableModel<Pedido> | void): Pedido;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nome?: string | null;
  readonly sobrenome?: string | null;
  readonly url_foto?: string | null;
  readonly token?: string | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly endereco?: string | null;
  readonly cidade?: string | null;
  readonly UF?: Uf | keyof typeof Uf | null;
  readonly Carts?: (Cart | null)[] | null;
  readonly Pedidos?: (Pedido | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nome?: string | null;
  readonly sobrenome?: string | null;
  readonly url_foto?: string | null;
  readonly token?: string | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly endereco?: string | null;
  readonly cidade?: string | null;
  readonly UF?: Uf | keyof typeof Uf | null;
  readonly Carts: AsyncCollection<Cart>;
  readonly Pedidos: AsyncCollection<Pedido>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerDelivery = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Delivery, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nome?: string | null;
  readonly plano_assinatura?: Plano | keyof typeof Plano | null;
  readonly situacao?: Situacao | keyof typeof Situacao | null;
  readonly responsavel?: string | null;
  readonly telefone?: string | null;
  readonly email?: string | null;
  readonly horario?: string | null;
  readonly minDeliveryTime?: number | null;
  readonly maxDeliveryTime?: number | null;
  readonly rating?: number | null;
  readonly taxa_entrega?: number | null;
  readonly url_imagem?: string | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly endereco?: string | null;
  readonly cidade?: string | null;
  readonly UF?: Uf | keyof typeof Uf | null;
  readonly Produtos?: (DeliveryProduto | null)[] | null;
  readonly Categorias?: (DeliveryCategoria | null)[] | null;
  readonly Carts?: (Cart | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDelivery = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Delivery, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nome?: string | null;
  readonly plano_assinatura?: Plano | keyof typeof Plano | null;
  readonly situacao?: Situacao | keyof typeof Situacao | null;
  readonly responsavel?: string | null;
  readonly telefone?: string | null;
  readonly email?: string | null;
  readonly horario?: string | null;
  readonly minDeliveryTime?: number | null;
  readonly maxDeliveryTime?: number | null;
  readonly rating?: number | null;
  readonly taxa_entrega?: number | null;
  readonly url_imagem?: string | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly endereco?: string | null;
  readonly cidade?: string | null;
  readonly UF?: Uf | keyof typeof Uf | null;
  readonly Produtos: AsyncCollection<DeliveryProduto>;
  readonly Categorias: AsyncCollection<DeliveryCategoria>;
  readonly Carts: AsyncCollection<Cart>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Delivery = LazyLoading extends LazyLoadingDisabled ? EagerDelivery : LazyDelivery

export declare const Delivery: (new (init: ModelInit<Delivery>) => Delivery) & {
  copyOf(source: Delivery, mutator: (draft: MutableModel<Delivery>) => MutableModel<Delivery> | void): Delivery;
}

type EagerCartItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CartItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly qtd: number;
  readonly cartID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCartItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CartItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly qtd: number;
  readonly cartID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CartItem = LazyLoading extends LazyLoadingDisabled ? EagerCartItem : LazyCartItem

export declare const CartItem: (new (init: ModelInit<CartItem>) => CartItem) & {
  copyOf(source: CartItem, mutator: (draft: MutableModel<CartItem>) => MutableModel<CartItem> | void): CartItem;
}

type EagerCart = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Cart, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly CartItems?: CartItem[] | null;
  readonly deliveryID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCart = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Cart, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly CartItems: AsyncCollection<CartItem>;
  readonly deliveryID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Cart = LazyLoading extends LazyLoadingDisabled ? EagerCart : LazyCart

export declare const Cart: (new (init: ModelInit<Cart>) => Cart) & {
  copyOf(source: Cart, mutator: (draft: MutableModel<Cart>) => MutableModel<Cart> | void): Cart;
}

type EagerCategoria = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Categoria, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly descricao: string;
  readonly url_imagem?: string | null;
  readonly ordem?: string | null;
  readonly deliverys?: (DeliveryCategoria | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategoria = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Categoria, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly descricao: string;
  readonly url_imagem?: string | null;
  readonly ordem?: string | null;
  readonly deliverys: AsyncCollection<DeliveryCategoria>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Categoria = LazyLoading extends LazyLoadingDisabled ? EagerCategoria : LazyCategoria

export declare const Categoria: (new (init: ModelInit<Categoria>) => Categoria) & {
  copyOf(source: Categoria, mutator: (draft: MutableModel<Categoria>) => MutableModel<Categoria> | void): Categoria;
}

type EagerItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly qtd?: number | null;
  readonly vr_unitario?: number | null;
  readonly vr_total?: number | null;
  readonly pedidoID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly qtd?: number | null;
  readonly vr_unitario?: number | null;
  readonly vr_total?: number | null;
  readonly pedidoID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Item = LazyLoading extends LazyLoadingDisabled ? EagerItem : LazyItem

export declare const Item: (new (init: ModelInit<Item>) => Item) & {
  copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}

type EagerProduto = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Produto, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nome: string;
  readonly descricao?: string | null;
  readonly vr_unitario: number;
  readonly url_imagem?: string | null;
  readonly deliverys?: (DeliveryProduto | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduto = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Produto, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nome: string;
  readonly descricao?: string | null;
  readonly vr_unitario: number;
  readonly url_imagem?: string | null;
  readonly deliverys: AsyncCollection<DeliveryProduto>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Produto = LazyLoading extends LazyLoadingDisabled ? EagerProduto : LazyProduto

export declare const Produto: (new (init: ModelInit<Produto>) => Produto) & {
  copyOf(source: Produto, mutator: (draft: MutableModel<Produto>) => MutableModel<Produto> | void): Produto;
}

type EagerCourier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Courier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nome: string;
  readonly cpf: string;
  readonly telefone: string;
  readonly tipo_transporte: Transporte | keyof typeof Transporte;
  readonly url_foto?: string | null;
  readonly token_sms: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly endereco?: string | null;
  readonly cidade: string;
  readonly uf: Uf | keyof typeof Uf;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCourier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Courier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nome: string;
  readonly cpf: string;
  readonly telefone: string;
  readonly tipo_transporte: Transporte | keyof typeof Transporte;
  readonly url_foto?: string | null;
  readonly token_sms: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly endereco?: string | null;
  readonly cidade: string;
  readonly uf: Uf | keyof typeof Uf;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Courier = LazyLoading extends LazyLoadingDisabled ? EagerCourier : LazyCourier

export declare const Courier: (new (init: ModelInit<Courier>) => Courier) & {
  copyOf(source: Courier, mutator: (draft: MutableModel<Courier>) => MutableModel<Courier> | void): Courier;
}

type EagerDeliveryProduto = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DeliveryProduto, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly deliveryId?: string | null;
  readonly produtoId?: string | null;
  readonly delivery: Delivery;
  readonly produto: Produto;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDeliveryProduto = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DeliveryProduto, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly deliveryId?: string | null;
  readonly produtoId?: string | null;
  readonly delivery: AsyncItem<Delivery>;
  readonly produto: AsyncItem<Produto>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DeliveryProduto = LazyLoading extends LazyLoadingDisabled ? EagerDeliveryProduto : LazyDeliveryProduto

export declare const DeliveryProduto: (new (init: ModelInit<DeliveryProduto>) => DeliveryProduto) & {
  copyOf(source: DeliveryProduto, mutator: (draft: MutableModel<DeliveryProduto>) => MutableModel<DeliveryProduto> | void): DeliveryProduto;
}

type EagerDeliveryCategoria = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DeliveryCategoria, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly deliveryId?: string | null;
  readonly categoriaId?: string | null;
  readonly delivery: Delivery;
  readonly categoria: Categoria;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDeliveryCategoria = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DeliveryCategoria, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly deliveryId?: string | null;
  readonly categoriaId?: string | null;
  readonly delivery: AsyncItem<Delivery>;
  readonly categoria: AsyncItem<Categoria>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DeliveryCategoria = LazyLoading extends LazyLoadingDisabled ? EagerDeliveryCategoria : LazyDeliveryCategoria

export declare const DeliveryCategoria: (new (init: ModelInit<DeliveryCategoria>) => DeliveryCategoria) & {
  copyOf(source: DeliveryCategoria, mutator: (draft: MutableModel<DeliveryCategoria>) => MutableModel<DeliveryCategoria> | void): DeliveryCategoria;
}