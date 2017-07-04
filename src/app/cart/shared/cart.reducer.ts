import * as cartActions from './cart.actions';
import { Product } from '../../products/shared/product.model';
import { CartItem } from './cart-item.model';
import * as _ from 'lodash';

export interface State {
    loading: boolean;
    cartItems: CartItem[];
};

const initialState: State = {
    loading: false,
    cartItems: []
};

export function reducer(state = initialState, action: cartActions.Actions): State {
    switch (action.type) {
        case cartActions.UPDATE:
        case cartActions.SET_VALUE: {
            let cartItems = [...state.cartItems];

            const cartItem = action.payload;
            const index = _.findIndex(state.cartItems, { productId: cartItem.productId });

            if (index === -1) {
                // if it's first time, append to cart
                cartItems = [...state.cartItems, cartItem];
            } else {
                // update the quantity based on different action
                // if UPDATE: use the param to calculate the quantity
                // if SET_VALUE: use the param quantity directly
                const quantity = action.type === cartActions.UPDATE ?
                    cartItems[index].quantity + cartItem.quantity
                    : cartItem.quantity;
                cartItems[index] = new CartItem(cartItem.product, quantity)

                // validation if quantity is invalid, delete it directly
                if (cartItems[index].quantity <= 0) {
                    _.pullAt(cartItems, [index]);
                }
            }

            return Object.assign({}, state, { cartItems });
        }
        case cartActions.DELETE: {
            const productId = action.payload;
            let cartItems = [...state.cartItems];

            // remove cart Item if can find one
            const index = _.findIndex(state.cartItems, { productId });
            if (index !== -1) {
                cartItems = _.pullAt(cartItems, [index]);
            }

            return Object.assign({}, state, { cartItems });
        }
        case cartActions.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case cartActions.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                cartItems: action.payload
            });
        } default: {
            return state;
        }
    }
}

export const getCartItems = (state: State) => state.cartItems;
export const getLoading = (state: State) => state.loading;
