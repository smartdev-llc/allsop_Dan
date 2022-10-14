import { Injectable } from '@angular/core';
import { createAction, props, Store } from '@ngrx/store';
import { ACTION_STRING } from 'app/configs/common';
import { IActionData } from 'app/interfaces/i-action-data';
import { getActionData } from 'app/utils/data';

@Injectable({
  providedIn: 'root'
})
export class CartItemActionService {

  constructor(private store: Store) { }

  static addOrUpdate = createAction(ACTION_STRING.addOrUpdateCartItems, props<IActionData>());
  addOrUpdate(list: any, description: string = '') {
    if (!list) {
      return;
    }
    const actionData = getActionData(list, description);
    return this.store.dispatch(CartItemActionService.addOrUpdate(actionData));
  }

  static remove = createAction(ACTION_STRING.removeCartItems, props<IActionData>());
  remove(list: any, description: string = '') {
    if (!list) {
      return;
    }
    const actionData = getActionData(list, description);
    return this.store.dispatch(CartItemActionService.remove(actionData));
  }
}
