import { Action } from '@ngrx/store';
import { Product } from '../../shared/product.model';

export const SELECT = '[Product] Select';
export const SELECT_SUCCESS = '[Product] Select Success';
export const SELECT_FAIL = '[Product] Select fail';

/**
 * select product by slug
 */
export class SelectAction implements Action {
    readonly type = SELECT;
    constructor(public payload: string) { }
}

export class SelectSuccessAction implements Action {
    readonly type = SELECT_SUCCESS;
    constructor(public payload: Product) { }
}

export class SelectFailAction implements Action {
    readonly type = SELECT_FAIL;
    constructor(public payload: any) { }
}
export type Actions
    = SelectAction
    | SelectSuccessAction
    | SelectFailAction;
