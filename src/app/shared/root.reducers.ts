import { createSelector } from 'reselect';
import { ActionReducerMap } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import * as fromCategory from '../products/category/shared/category.reducer';
import * as fromProduct from '../products/product/shared/product.reducer';
import * as fromCart from '../cart/shared/cart.reducer';

export interface State {
  category: fromCategory.State;
  product: fromProduct.State;
  cart: fromCart.State;
  routerReducer: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  category: fromCategory.reducer,
  product: fromProduct.reducer,
  cart: fromCart.reducer,
  routerReducer: fromRouter.routerReducer
};

export const getCategoryState = (state: State) => state.category;
export const getCategoryProducts = createSelector(getCategoryState, fromCategory.getProducts);
export const getCategoryLoaded = createSelector(getCategoryState, fromCategory.getLoaded);
export const getCategoryLoading = createSelector(getCategoryState, fromCategory.getLoading);

export const getProductState = (state: State) => state.product;
export const getProductSelect = createSelector(getProductState, fromProduct.getProduct);
export const getProductLoaded = createSelector(getProductState, fromProduct.getLoaded);
export const getProductLoading = createSelector(getProductState, fromProduct.getLoading);

export const getCartState = (state: State) => state.cart;
export const getCartCartItems = createSelector(getCartState, fromCart.getCartItems);
export const getCartLoading = createSelector(getCartState, fromCart.getLoading);

export const getRouterState = (state: State) => state.routerReducer;
