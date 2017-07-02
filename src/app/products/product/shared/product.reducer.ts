import * as productActions from './product.actions';
import { Product } from '../../shared/product.model';

export interface State {
    loaded: boolean;
    loading: boolean;
    // selected product
    product: Product;
};

const initialState: State = {
    loaded: false,
    loading: false,
    product: null,
};

export function reducer(state = initialState, action: productActions.Actions): State {
    switch (action.type) {
        case productActions.SELECT: {
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        }
        case productActions.SELECT_SUCCESS: {
            const product = action.payload;
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                product
            });
        }
        default: {
            return state;
        }
    }
}

export const getProduct = (state: State) => state.product;
