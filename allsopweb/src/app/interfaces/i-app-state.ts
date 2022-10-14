import { Table } from "app/entities/table";

export interface IAppState {
  categories: Table<string>;
  products: Table<string>;
  carts: Table<string>;
  cartItems: Table<string>;
}