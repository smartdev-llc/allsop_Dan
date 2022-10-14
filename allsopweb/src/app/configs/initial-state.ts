import { Table } from "app/entities/table";
import { IAppState } from "app/interfaces/i-app-state";

export const INITIAL_STATE: IAppState = {
  categories: new Table<string>(),
  products: new Table<string>(),
  carts: new Table<string>(),
  cartItems: new Table<string>,
};