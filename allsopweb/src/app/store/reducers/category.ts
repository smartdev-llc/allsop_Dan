import { createReducer, on } from "@ngrx/store";
import { addOrUpdateState } from 'app/utils/state';
import { INITIAL_STATE } from "app/configs/initial-state";
import { CategoryActionService } from "app/store/actions/category";

export const categories = createReducer(
  INITIAL_STATE.categories,
  on(CategoryActionService.addOrUpdate,
    (state, action) => addOrUpdateState(state, action))
);