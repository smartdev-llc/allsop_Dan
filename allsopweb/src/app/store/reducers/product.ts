import { createReducer, on } from "@ngrx/store";
import { addOrUpdateState } from 'app/utils/state';
import { ProductActionService } from "app/store/actions/product";
import { INITIAL_STATE } from "app/configs/initial-state";

export const products = createReducer(
  INITIAL_STATE.products,
  on(ProductActionService.addOrUpdate,
    (state, action) => addOrUpdateState(state, action))
);