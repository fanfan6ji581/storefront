import { reducer } from './category.reducer';
import * as fromCategory from './category.reducer';
import * as categorytActions from './category.actions';
import { Product } from '../../shared/product.model';
import * as testingModels from '../../../shared/testing/models';

describe('Reducer: CategoryReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toEqual(fromCategory.initialState);
    });
  });

  describe('LOAD_SUCCESS action', () => {
    it('should keep all the products', () => {

      const expectedResult = {
        loading: false,
        loaded: true,
        products: testingModels.products
      } as fromCategory.State;

      const result = reducer(fromCategory.initialState, new categorytActions.LoadSuccessAction(testingModels.products));
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
