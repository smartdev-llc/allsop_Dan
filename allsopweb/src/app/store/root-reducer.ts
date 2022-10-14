import { cartItems, carts } from "app/store/reducers/cart";
import { categories } from "app/store/reducers/category";
import { products } from "app/store/reducers/product";

export const rootReducer = {
  categories: categories,
  products: products,
  carts: carts,
  cartItems: cartItems,
};