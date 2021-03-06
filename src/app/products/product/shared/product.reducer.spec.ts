import { reducer } from './product.reducer';
import * as fromProduct from './product.reducer';
import * as productActions from './product.actions';
import { Product } from '../../shared/product.model';
import * as testingModels from '../../../shared/testing/models';

describe('Reducer: ProductReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toEqual(fromProduct.initialState);
    });
  });

  describe('SELECT_SUCCESS action', () => {
    it('should select a product', () => {
      const expectedResult = {
        loading: false,
        loaded: true,
        product: testingModels.product1
      } as fromProduct.State;

      const result = reducer(fromProduct.initialState, new productActions.SelectSuccessAction(testingModels.product1));
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
