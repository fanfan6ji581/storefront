import { reducer } from './cart.reducer';
import * as fromCart from './cart.reducer';
import * as carttActions from './cart.actions';
import { Product } from '../../products/shared/product.model';
import { CartItem } from './cart-item.model';

describe('CartReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toEqual(fromCart.initialState);
    });
  });

  describe('ADD & UPDATE action', () => {
    const product1 = {
      'id': 1,
      'title': 'Blue Stripe Stoneware Plate',
      'brand': 'Kiriko',
      'price': 40,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.',
      'image': 'blue-stripe-stoneware-plate.jpg',
      'slug': 'blue-stripe-stoneware-plate'
    } as Product;

    const product2 = {
      'id': 2,
      'title': 'Hand Painted Blue Flat Dish',
      'brand': 'Kiriko',
      'price': 28,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget arcu. Curabitur ac pharetra nisl, sit amet mattis dolor.',
      'image': 'hand-painted-blue-flat-dish.jpg',
      'slug': 'blue-stripe-stoneware-plate'
    } as Product;

    const cartItem1 = {
      productId: 1,
      product: product1,
      quantity: 1
    } as CartItem;

    const cartItem2 = {
      productId: 2,
      product: product2,
      quantity: 2
    } as CartItem;

    function insertCartItems(action) {
      const updatedCartItem = {
        productId: 1,
        product: product1,
        quantity: 3
      } as CartItem;

      const expectedResult = {
        cartItems: [updatedCartItem],
        loading: false
      };

      const result = reducer(fromCart.initialState, new action(updatedCartItem));
      expect(result).toEqual(expectedResult);
    }

    function updateCartItems(action) {
      const updatedCartItem = {
        productId: 1,
        product: product1,
        quantity: 3
      } as CartItem;

      const initialState = {
        cartItems: [cartItem1],
        loading: false
      } as any;

      const expectedResult = {
        cartItems: [{
          productId: 1,
          product: product1,
          quantity: 4
        }],
        loading: false
      };

      const result = reducer(initialState, new action(updatedCartItem));
      expect(result).toEqual(expectedResult);
    }
    it('should able to insert quantity in cart', () => {
      insertCartItems(carttActions.AddAction);
      insertCartItems(carttActions.UpdateAction);
    });
    it('should able to plus quantity in cart', () => {
      updateCartItems(carttActions.AddAction);
      updateCartItems(carttActions.UpdateAction);
    });
  });

});
