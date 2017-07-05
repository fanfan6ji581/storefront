import * as categoryActions from './category.actions';
import { Product } from '../../shared/product.model';

export interface State {
    loaded: boolean;
    loading: boolean;
    products: Product[];
};

export const initialState: State = {
    loaded: false,
    loading: false,
    products: []
};

export function reducer(state = initialState, action: categoryActions.Actions): State {
    switch (action.type) {
        case categoryActions.LOAD: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false,
            });
        }
        case categoryActions.LOAD_SUCCESS: {
            const products = action.payload;
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                products
            });
        }
        default: {
            return state;
        }
    }
}

export const getProducts = (state: State) => state.products;
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
