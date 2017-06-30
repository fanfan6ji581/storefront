import * as productActions from './product.actions';
import { Product } from './product.model';

export interface State {
    loaded: boolean;
    loading: boolean;
    products: Product[];
    // selected product
    product: Product;
};

const initialState: State = {
    loaded: false,
    loading: false,
    products: [],
    product: null,
};

export function reducer(state = initialState, action: productActions.Actions): State {
    switch (action.type) {
        case productActions.LOAD_SUCCESS: {
            const products = action.payload;
            return Object.assign({}, state, { products });
        }

        // case book.SEARCH_COMPLETE: {
        //     const books = action.payload;

        //     return {
        //         ids: books.map(book => book.id),
        //         loading: false,
        //         query: state.query
        //     };
        // }

        default: {
            return state;
        }
    }
}

export const getProducts = (state: State) => state.products;
export const getProduct = (state: State) => state.product;
