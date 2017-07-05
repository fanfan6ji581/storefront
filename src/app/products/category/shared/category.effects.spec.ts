import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CategoryEffects } from './category.effects';
import { ProductService } from '../../shared/product.service';
import { Product } from '../../shared/product.model';
import { Observable } from 'rxjs/Observable';
import * as categoryActions from './category.actions';
import * as testingModels from '../../../shared/testing/models';

describe('Effects: CategoryEffects', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            EffectsTestingModule
        ],
        providers: [
            CategoryEffects,
            {
                provide: ProductService,
                useValue: jasmine.createSpyObj('ProductService', ['loadProducts'])
            }
        ]
    }));

    function setup(params?: { loadProductsReturnValue: any }) {
        const categoryService = TestBed.get(ProductService);
        if (params) {
            categoryService.loadProducts.and.returnValue(params.loadProductsReturnValue);
        }

        return {
            runner: TestBed.get(EffectsRunner),
            categoryEffects: TestBed.get(CategoryEffects)
        };
    }

    describe('load$', () => {
        it('should return a new categoryActions.LoadAction, with all products, on success', fakeAsync(() => {
            const { runner, categoryEffects } = setup({ loadProductsReturnValue: Observable.of(testingModels.products) });

            const expectedResult = new categoryActions.LoadSuccessAction(testingModels.products);
            runner.queue(new categoryActions.LoadAction());

            let result = null;
            categoryEffects.load$.subscribe(_result => result = _result);

            expect(result).toEqual(expectedResult);
        }));

        it('should return a new category.LoadFailAction, with an error object, if the product service throws', fakeAsync(() => {
            const err = new Error();
            const { runner, categoryEffects } = setup({ loadProductsReturnValue: Observable.throw(err) });

            const expectedResult = new categoryActions.LoadFailAction(err);
            runner.queue(new categoryActions.LoadAction());

            let result = null;
            categoryEffects.load$.subscribe(_result => result = _result);
            expect(result).toEqual(expectedResult);
        }));
    });
});

