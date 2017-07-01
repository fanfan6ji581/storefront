import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromCategory from '../products/category/shared/category.reducer';
import * as fromProduct from '../products/product/shared/product.reducer';

export interface State {
  category: fromCategory.State;
  product: fromProduct.State;
}

const reducers = {
  category: fromCategory.reducer,
  product: fromProduct.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}


export const getCategoryState = (state: State) => state.category;
export const getCategoryProducts = createSelector(getCategoryState, fromCategory.getProducts);

export const getProductState = (state: State) => state.product;
export const getProductSelect = createSelector(getProductState, fromProduct.getProduct);
