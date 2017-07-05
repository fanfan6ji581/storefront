import { reducer } from './product.reducer';
import * as fromProduct from './product.reducer';
import * as productActions from './product.actions';
import { Product } from '../../shared/product.model';

describe('ProductReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toEqual(fromProduct.initialState);
    });
  });

  describe('SELECT_SUCCESS action', () => {
    it('should select a product', () => {
      const product = {
        'title': 'Blue Stripe Stoneware Plate',
        'brand': 'Kiriko',
        'price': 40,
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.',
        'image': 'blue-stripe-stoneware-plate.jpg',
        'slug': 'blue-stripe-stoneware-plate'
      } as Product;

      const expectedResult = {
        loading: false,
        loaded: true,
        product: product
      } as fromProduct.State;

      const result = reducer(fromProduct.initialState, new productActions.SelectSuccessAction(product));
      expect(result).toEqual(expectedResult);
    });
  });

  describe('SELECT Action should have a loading status', () => {
    it('should have a loading state', () => {
      const expectedResult = {
        loading: true,
        loaded: false,
        product: null
      } as fromProduct.State;

      const result = reducer(fromProduct.initialState, new productActions.SelectAction('blue-stripe-stoneware-plate'));
      expect(result).toEqual(expectedResult);
    });
  });
});
