import { createReducer, on } from "@ngrx/store";
import { addOrUpdateState, removeState } from 'app/utils/state';
import { CartItemActionService } from "app/store/actions/cart-item";
import { CartActionService } from "app/store/actions/cart";
import { INITIAL_STATE } from "app/configs/initial-state";

export const carts = createReducer(
  INITIAL_STATE.carts,
  on(CartActionService.addOrUpdate,
    (state, action) => addOrUpdateState(state, action))
);

export const cartItems = createReducer(
  INITIAL_STATE.cartItems,
  on(CartItemActionService.addOrUpdate,
    (state, action) => addOrUpdateState(state, action)),
  on(CartItemActionService.remove,
    (state, action) => removeState(state, action))
);