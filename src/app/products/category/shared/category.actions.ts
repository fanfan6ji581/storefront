import { Action } from '@ngrx/store';
import { Product } from '../../shared/product.model';

export const LOAD = '[Category] load';
export const LOAD_SUCCESS = '[Category] load success';
export const LOAD_FAIL = '[Category] load fail';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadAction implements Action {
    readonly type = LOAD;
    payload;
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: Product[]) { }
}

export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;
    constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = LoadAction
    | LoadSuccessAction
    | LoadFailAction;
