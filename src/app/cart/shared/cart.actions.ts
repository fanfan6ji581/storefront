import { Action } from '@ngrx/store';
import { CartItem } from './cart-item.model';

export const UPDATE = '[Cart] update';
export const DELETE = '[Cart] delete';
export const LOAD = '[Cart] load';
export const LOAD_SUCCESS = '[Cart] load success';

export class UpdateAction implements Action {
    readonly type = UPDATE;
    constructor(public payload: CartItem) { }
}

export class DeleteAction implements Action {
    readonly type = DELETE;
    constructor(public payload: number) { }
}

export class loadAction implements Action {
    readonly type = LOAD;
    payload;
}

export class loadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: CartItem[]) { }
}

export type Actions
    = UpdateAction
    | DeleteAction
    | loadAction
    | loadSuccessAction;
