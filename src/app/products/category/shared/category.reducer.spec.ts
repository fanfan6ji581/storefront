import { reducer } from './category.reducer';
import * as fromCategory from './category.reducer';
import * as categorytActions from './category.actions';
import { Product } from '../../shared/product.model';

describe('CategoryReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toEqual(fromCategory.initialState);
    });
  });

  describe('LOAD_SUCCESS action', () => {
    it('should keep all the products', () => {
      const product1 = {
        'title': 'Blue Stripe Stoneware Plate',
        'brand': 'Kiriko',
        'price': 40,
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.',
        'image': 'blue-stripe-stoneware-plate.jpg',
        'slug': 'blue-stripe-stoneware-plate'
      } as Product;

      const product2 = {
        'title': 'Hand Painted Blue Flat Dish',
        'brand': 'Kiriko',
        'price': 28,
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget arcu. Curabitur ac pharetra nisl, sit amet mattis dolor.',
        'image': 'hand-painted-blue-flat-dish.jpg',
        'slug': 'blue-stripe-stoneware-plate'
      } as Product;

      const products = [product1, product2];

      const expectedResult = {
        loading: false,
        loaded: true,
        products: products
      } as fromCategory.State;

      const result = reducer(fromCategory.initialState, new categorytActions.LoadSuccessAction(products));
      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD Action', () => {
    it('should have a loading state', () => {
      const expectedResult = {
        loading: true,
        loaded: false,
        products: [],
      } as fromCategory.State;

      const result = reducer(fromCategory.initialState, new categorytActions.LoadAction());
      expect(result).toEqual(expectedResult);
    });
  });
});
