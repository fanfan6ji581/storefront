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

  const cartItem1 = new CartItem(product1, 1);
  const cartItem2 = new CartItem(product2, 2);

  describe('ADD & UPDATE & SET_VALUE action', () => {

    function insertCartItems(action) {
      const updatedCartItem = new CartItem(product1, 3);

      const expectedResult = {
        cartItems: [updatedCartItem],
        loading: false
      };

      const result = reducer(fromCart.initialState, new action(updatedCartItem));
      expect(result).toEqual(expectedResult);
    }

    function updatePositiveCartItems(action) {
      const updatedCartItem = new CartItem(product1, 3);
      const initialState = {
        cartItems: [cartItem1],
        loading: false
      } as any;

      const expectedResult = {
        cartItems: [new CartItem(product1, 4)],
        loading: false
      };

      const result = reducer(initialState, new action(updatedCartItem));
      expect(result).toEqual(expectedResult);
    }
    it('should be able to insert new item to shopping cart', () => {
      insertCartItems(carttActions.AddAction);
      insertCartItems(carttActions.UpdateAction);
      insertCartItems(carttActions.SetValueAction);
    });
    it('should be able to update positive quantity in cart', () => {
      updatePositiveCartItems(carttActions.AddAction);
      updatePositiveCartItems(carttActions.UpdateAction);
    });
  });

  describe('SET_VALUE action', () => {
    it('should be able to set the quantity of cart item', () => {
      const updatedCartItem = new CartItem(product1, 3);

      const initialState = {
        cartItems: [cartItem1],
        loading: false
      } as any;

      const expectedResult = {
        cartItems: [updatedCartItem],
        loading: false
      };

      const result = reducer(initialState, new carttActions.SetValueAction(updatedCartItem));
      expect(result).toEqual(expectedResult);
    });
  });

  describe('UPDATE action', () => {
    it('should be able to update negative quantity of cart item', () => {
      const updatedCartItem = new CartItem(product2, -1);

      const initialState = {
        cartItems: [cartItem2],
        loading: false
      } as any;

      const expectedResult = {
        cartItems: [new CartItem(product2, 1)],
        loading: false
      };

      const result = reducer(initialState, new carttActions.UpdateAction(updatedCartItem));
      expect(result).toEqual(expectedResult);
    });
  });

  describe('DELETE action', () => {
    it('should not affect other cart item', () => {
      const initialState = {
        cartItems: [cartItem2],
        loading: false
      } as any;

      const expectedResult = {
        cartItems: [cartItem2],
        loading: false
      };

      const result = reducer(initialState, new carttActions.DeleteAction(1));
      expect(result).toEqual(expectedResult);
    });

    it('should be able to delete cart item', () => {
      const initialState = {
        cartItems: [cartItem2],
        loading: false
      } as any;

      const expectedResult = {
        cartItems: [],
        loading: false
      };

      const result = reducer(initialState, new carttActions.DeleteAction(2));
      expect(result).toEqual(expectedResult);
    });
  });

});
