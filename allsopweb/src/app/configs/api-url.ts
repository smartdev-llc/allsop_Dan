import { environment } from "environments/environment";

const FIX_API = `${environment.apiUrl}/api`;

export const CART_URLS = {
  get: FIX_API + '/cart',
  create: FIX_API + '/cart/create-cart',
  addProduct: FIX_API + '/cart/add-product-to-cart',
  removeCartItem: FIX_API + '/cart/remove-cart-item',
  updateCartItem: FIX_API + '/cart/update-cart-item',
  applyPromotionCode: FIX_API + '/cart/apply-promotion-code',
};

export const PRODUCT_URLS = {
  get: FIX_API + '/products',
};