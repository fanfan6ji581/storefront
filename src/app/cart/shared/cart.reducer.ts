import * as cartActions from './cart.actions';
import { Product } from '../../products/shared/product.model';
import { CartItem } from './cart-item.model';
import * as _ from 'lodash';

export interface State {
    cartItems: CartItem[];
};

const initialState: State = {
    cartItems: []
};

export function reducer(state = initialState, action: cartActions.Actions): State {
    switch (action.type) {
        case cartActions.UPDATE: {
            let newCartItems = [...state.cartItems];

            const cartItem = action.payload;
            const index = _.findIndex(state.cartItems, { productId: cartItem.productId });

            // first time add to cart
            if (index == -1) {
                newCartItems = [...state.cartItems, cartItem];
            } else {
                // update the quantity of exisitng cart Item
                newCartItems[index] = new CartItem(cartItem.product, newCartItems[index].quantity + cartItem.quantity)
                // delete from cart, if invalid quantity
                if (newCartItems[index].quantity <= 0) {
                    _.pullAt(newCartItems, [index]);
                }
            }

            return Object.assign({}, state, {
                cartItems: newCartItems
            });
        }
        case cartActions.DELETE: {
            const productId = action.payload;
            let newCartItems = [...state.cartItems];

            // remove cart Item if can find one
            const index = _.findIndex(state.cartItems, { productId });
            if (index == -1) {
                _.pullAt(newCartItems, [index]);
            }

            return Object.assign({}, state, {
                cartItems: newCartItems
            });
        }
        case cartActions.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                cartItems: action.payload
            });
        } default: {
            return state;
        }
    }
}

export const getCartItems = (state: State) => state.cartItems;
