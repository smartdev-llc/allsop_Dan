import { Injectable } from '@angular/core';
import { createAction, props, Store } from '@ngrx/store';
import { ACTION_STRING } from 'app/configs/common';
import { IActionData } from 'app/interfaces/i-action-data';
import { getActionData } from 'app/utils/data';

@Injectable({
  providedIn: 'root'
})
export class CartActionService {

  constructor(private store: Store) { }

  static addOrUpdate = createAction(ACTION_STRING.addOrUpdateCarts, props<IActionData>());
  addOrUpdate(list: any, description: string = '') {
    if (!list) {
      return;
    }
    const actionData = getActionData(list, description);
    return this.store.dispatch(CartActionService.addOrUpdate(actionData));
  }
}
