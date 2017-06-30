import { Action } from '@ngrx/store';
import { Product } from './product.model';

export const LOAD = '[Product] load';
export const LOAD_SUCCESS = '[Product] load success';
export const LOAD_FAIL = '[Product] load fail';
export const SELECT = '[Product] Select';
export const SELECT_FAIL = '[Product] Select fail';

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

export class SelectAction implements Action {
    readonly type = SELECT;
    constructor(public payload: string) { }
}

export class SelectFailAction implements Action {
    readonly type = SELECT_FAIL;
    constructor(public payload: any) { }
}
/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
    = LoadAction
    | LoadSuccessAction
    | LoadFailAction
    | SelectAction
    | SelectFailAction;
