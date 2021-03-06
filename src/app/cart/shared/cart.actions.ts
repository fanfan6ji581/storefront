import { Action } from '@ngrx/store';
import { CartItem } from './cart-item.model';

export const ADD = '[Cart] add';
export const UPDATE = '[Cart] update';
export const DELETE = '[Cart] delete';
export const SET_VALUE = '[Cart] set value';
export const LOAD = '[Cart] load';
export const LOAD_SUCCESS = '[Cart] load success';

/**
 * param here is increament or decreament count,
 * like {quantity:1} means increase quantity by 1
 */
export class AddAction implements Action {
    readonly type = ADD;
    constructor(public payload: CartItem) { }
}

/**
 * param here is increament or decreament count,
 * like {quantity:1} means increase quantity by 1
 */
export class UpdateAction implements Action {
    readonly type = UPDATE;
    constructor(public payload: CartItem) { }
}


/**
 * payload should be the product id
 */
export class DeleteAction implements Action {
    readonly type = DELETE;
    constructor(public payload: number) { }
}

/**
 * param here is the actual quantity
 * like {quantity:1} means set quantity to 1
 */
export class SetValueAction implements Action {
    readonly type = SET_VALUE;
    constructor(public payload: CartItem) { }
}

/**
 * when cart page initilized, load shopping cart info from local storage
 */
export class LoadAction implements Action {
    readonly type = LOAD;
    payload;
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: CartItem[]) { }
}

export type Actions
    = AddAction
    | UpdateAction
    | DeleteAction
    | SetValueAction
    | LoadAction
    | LoadSuccessAction;
